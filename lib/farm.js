/** @param {NS} ns **/
export function incomePerSec(ns,s) {
    return ns.getServerMoneyAvailable(s) / ns.getHackTime(s) * ns.hackAnalyze(s)
}