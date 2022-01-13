import * as pmem from "./lib-pmem.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (!await pmem.exists(ns, "hacknet.reserve.money"))  await pmem.set(ns, "hacknet.reserve.money", 0)
    if (!await pmem.exists(ns, "hacknet.reserve.hashes")) await pmem.set(ns, "hacknet.reserve.hashes", 0)

    while (true) {
        ns.clearLog()
        var reserve_money = Number.parseInt(await pmem.get(ns, "hacknet.reserve.money"))
        var reserve_hash = Number.parseInt(await pmem.get(ns, "hacknet.reserve.hashes"))

        var cost = ns.hacknet.getPurchaseNodeCost()
        if (
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
                ns.tprint("Upgrading level on #" + i + " to " + (stats.level + 1) + " for $" + cost.toFixed(2))
                ns.hacknet.upgradeLevel(i);
            }
            cost = ns.hacknet.getCoreUpgradeCost(i);
            if (cost < ns.getPlayer().money - reserve_money) {
                ns.tprint("Upgrading cores on #" + i + " to " + (stats.cores + 1) + " for $" + cost.toFixed(2))
                ns.hacknet.upgradeCore(i);
            }
            cost = ns.hacknet.getRamUpgradeCost(i);
            if (cost < ns.getPlayer().money - reserve_money) {
                ns.tprint("Upgrading ram on #" + i + " to " + (stats.ram * 2) + " for $" + cost.toFixed(2))
                ns.hacknet.upgradeRam(i);
            }
            cost = ns.hacknet.getCacheUpgradeCost(i);
            if (cost < ns.getPlayer().money - reserve_money) {
                ns.tprint("Upgrading cache on #" + i + " to " + (stats.cache + 1) + " for $" + cost.toFixed(2))
                ns.hacknet.upgradeCache(i);
            }
            production += ns.hacknet.getNodeStats(i).production
        }
        if (ns.hacknet.numHashes() >= (4.00 + reserve_hash)) {
            ns.hacknet.spendHashes("Sell for Money")
        }
        await ns.sleep(1000)
    }
}