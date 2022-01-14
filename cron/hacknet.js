import * as db from "/sys/database"
/** @param {NS} ns **/
export async function main(ns) {
    if (db.get("hacknet.reserve.money")  == null) db.set("hacknet.reserve.money" , 5e6)
    if (db.get("hacknet.reserve.hashes") == null) db.set("hacknet.reserve.hashes", 1e3)
    if (db.get("hacknet.spend.on")       == null) db.set("hacknet.spend.on"      , "Sell for Money")
    ns.tprint("test")
    //ns.clearLog()
    var reserve_money  = db.get("hacknet.reserve.money")
    var reserve_hashes = db.get("hacknet.reserve.hashes")

    var cost = ns.hacknet.getPurchaseNodeCost()
    let loopCtr = 20
    while (
        (cost < ns.getPlayer().money - reserve_money) && (loopCtr-- > 0)
    ) {
        ns.tprint("Buying hacknet node for $" + cost.toFixed(2))
        ns.hacknet.purchaseNode();
    }

    var production = 0
    for (var i = 0; i < ns.hacknet.numNodes(); i++) {
        var stats = ns.hacknet.getNodeStats(i);
        var cost = ns.hacknet.getLevelUpgradeCost(i);
        loopCtr = 10
        if (cost < ns.getPlayer().money - reserve_money && loopCtr-- > 0) {
            ns.print("Upgrading level on #" + i + " to " + (stats.level + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeLevel(i);
        }
        cost = ns.hacknet.getCoreUpgradeCost(i);
        loopCtr = 10
        if (cost < ns.getPlayer().money - reserve_money && loopCtr-- > 0) {
            ns.print("Upgrading cores on #" + i + " to " + (stats.cores + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeCore(i);
        }
        cost = ns.hacknet.getRamUpgradeCost(i);
        loopCtr = 10
        if (cost < ns.getPlayer().money - reserve_money && loopCtr-- > 0) {
            ns.print("Upgrading ram on #" + i + " to " + (stats.ram * 2) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeRam(i);
        }
        cost = ns.hacknet.getCacheUpgradeCost(i);
        loopCtr = 10
        while (cost < ns.getPlayer().money - reserve_money && loopCtr-- > 0) {
            ns.print("Upgrading cache on #" + i + " to " + (stats.cache + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeCache(i);
        }
        production += ns.hacknet.getNodeStats(i).production
    }
    loopCtr = 10
    while (ns.hacknet.numHashes() >= reserve_hashes && loopCtr-- > 0) {
        ns.hacknet.spendHashes(db.get("hacknet.spend.on"))
    }
    await ns.write("/logs/cron/hacknet.txt", ns.getScriptLogs().join("\n"), "w")
}