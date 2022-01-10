/** @param {import(".").NS} ns **/
export async function main(ns) {
    for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        var stats = ns.sleeve.getSleeveStats(i);
        if (stats.shock) {
            ns.sleeve.setToShockRecovery(i);
        } else if (stats.sync < 100) {
            ns.sleeve.setToSynchronize(i);
        } else if (stats.hacking < 100) {
            ns.sleeve.setToUniversityCourse(i, "rothman university", "Study computer science")
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
