/** @param {import(".").NS} ns **/
export async function main(ns) {
    var costs = [];
    for (var i = 0; i < ns.hacknet.numNodes(); i++) {
        var stats = ns.hacknet.getNodeStats(i);
        var cost = ns.hacknet.getLevelUpgradeCost(i);
        if (cost < ns.getPlayer().money / 20) {
            //ns.tprint("Upgrading level on #" + i + " to " + (stats.level + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeLevel(i);
        }
        cost = ns.hacknet.getCoreUpgradeCost(i);
        if (cost < ns.getPlayer().money / 20) {
            //ns.tprint("Upgrading cores on #" + i + " to " + (stats.cores + 1) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeCore(i);
        }
        cost = ns.hacknet.getRamUpgradeCost(i);
        if (cost < ns.getPlayer().money / 20) {
            //ns.tprint("Upgrading ram on #" + i + " to " + (stats.ram * 2) + " for $" + cost.toFixed(2))
            ns.hacknet.upgradeRam(i);
        }
    }
    var cost = ns.hacknet.getPurchaseNodeCost();
    if (
        ns.hacknet.getPurchaseNodeCost() < ns.getPlayer().money / 20 &&
        ns.hacknet.numNodes < 15
    ) {
        //ns.tprint("Buying hacknet node for $" + cost.toFixed(2))
        ns.hacknet.purchaseNode();
    }
}