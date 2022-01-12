/** @param {import(".").NS} ns **/
export async function main(ns) {
    for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        var stats = ns.sleeve.getSleeveStats(i);
        var task = ns.sleeve.getTask(i)

        if (stats.shock) {
            ns.sleeve.setToShockRecovery(i);
        } else if (stats.sync < 100) {
            if (task.task != "Synchro")
            ns.sleeve.setToSynchronize(i);
        }
    }
}
