import {data} from "sys-database"
/** @param {NS} ns **/
export async function main(ns) {
    if (data["hacknet.reserve.money"] == null)  data["hacknet.reserve.money"] = 5e6
    if (data["hacknet.reserve.hashes"] == null) data["hacknet.reserve.hashes"] = 1e3
    if (data["hacknet.spend.on"] == null) data["hacknet.spend.on"] = "Sell for Money"
    
    //ns.clearLog()
    ns.tail()
    var reserve_money  = data["hacknet.reserve.money"]  ?? 5e6
    var reserve_hashes = data["hacknet.reserve.hashes"] ?? 1e3

    var cost = ns.hacknet.getPurchaseNodeCost()
    while (
        cost < ns.getPlayer().money - reserve_money
    ) {
        ns.tprint("Buying hacknet node for $" + cost.toFixed(2))
        ns.hacknet.purchaseNode();
    }

    var production = 0
    for (var i = 0; i < ns.hacknet.numNodes(); i++) {
        var stats = ns.hacknet.getNodeStats(i);
        var cost = ns.hacknet.getLevelUpgradeCost(i);
        if (cost < ns.getPlayer().money - reserve_money) {
            ns.print("Upgrading level on #" + i + " to " + (stats.level + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeLevel(i);
        }
        cost = ns.hacknet.getCoreUpgradeCost(i);
        if (cost < ns.getPlayer().money - reserve_money) {
            ns.print("Upgrading cores on #" + i + " to " + (stats.cores + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeCore(i);
        }
        cost = ns.hacknet.getRamUpgradeCost(i);
        if (cost < ns.getPlayer().money - reserve_money) {
            ns.print("Upgrading ram on #" + i + " to " + (stats.ram * 2) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeRam(i);
        }
        cost = ns.hacknet.getCacheUpgradeCost(i);
        if (cost < ns.getPlayer().money - reserve_money) {
            ns.print("Upgrading cache on #" + i + " to " + (stats.cache + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeCache(i);
        }
        production += ns.hacknet.getNodeStats(i).production
    }
    if (ns.hacknet.numHashes() >= (4.00 + reserve_hashes)) {
        ns.hacknet.spendHashes(data["hacknet.spend.on"])
    }
}