/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        var stats = ns.sleeve.getSleeveStats(i);
        var task = ns.sleeve.getTask(i)

        if (stats.shock) {
            ns.sleeve.setToShockRecovery(i);
        } else if (stats.sync < 100) {
            if (task.task != "Synchro")
            ns.sleeve.setToSynchronize(i);
        }
        
        var augs = ns.sleeve.getSleevePurchasableAugs(i).length;
        if (ns.sleeve.getSleevePurchasableAugs(i).length) {
            for (var aug in augs) {
                if (ns.getAugmentationPrice(aug) < ns.getPlayer().money / 20) {
                    ns.sleeve.purchaseSleeveAug(i, aug);
                    ns.tprint("installing " + aug + " on sleeve #" + i)
                }
            }
        }
    }
}
export async function autocomplete(data, args) {
    
}
