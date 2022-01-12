import * as Servers from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    ns.clearLog()
    ns.disableLog("ALL")
    var targets = (await Servers.getServers(ns));
    var stats = [];
    for (var t of targets.filter(t => !ns.getPurchasedServers().includes(t))) {
        // empty structure to hold our data.
        var server = {}
        // just to know who we're attacking
        server.hostname = t
        // used for sorting
        server.hackLevel   = ns.getServerRequiredHackingLevel(t)
        server.moneyPerSec = ns.getServerMaxMoney(t) ? ns.hackAnalyze(t) * ns.getServerMoneyAvailable(t) / ns.getHackTime(t) : 0
        // actual required threads
        server.hackThreads = ns.getServerMaxMoney(t) ? ns.hackAnalyzeThreads(t, ns.getServerMoneyAvailable(t) * 0.10) : 0 // 10% on whatever it has now.
        server.growThreads = ns.getServerMaxMoney(t) ? ns.growthAnalyze(t, Math.max(ns.getServerMaxMoney(t) / ns.getServerMoneyAvailable(t) + 0.1,1)) : 0; // helps ensure it's max money
        server.weakThreads = ns.getServerMaxMoney(t) ? (
            ns.getServerSecurityLevel(t) 
            - ns.getServerMinSecurityLevel(t) 
            + ns.growthAnalyzeSecurity(server.growThreads) * ns.getWeakenTime(t) / ns.getGrowTime(t)
            + ns.hackAnalyzeSecurity(server.hackThreads)   * ns.getWeakenTime(t) / ns.getHackTime(t)
        ) / ns.weakenAnalyze(1) : 0; // bring security to mininum, taking into account grow and hack threads
        
        // save it all in the array.
        stats.push(server)
    }

    ns.print(
        "hostname".padStart(18)
        + " " + "lvl".padStart(5)
        + " " + "Hack".padStart(4)
        + " " + "Grow".padStart(4)
        + " " + "Weak".padStart(4)
        + " " + "$/s".padStart(4)
    )
    for (var t of stats
        .filter(s => s.moneyPerSec)
        .filter(s => ns.getServerMaxMoney(s.hostname))
        .filter(s => s.hackLevel <= ns.getHackingLevel())
        .sort((a,b) => b.hackLevel - a.hackLevel)
    ) {
        ns.print(
            t.hostname.padStart(18)
            + " " + t.hackLevel.toFixed(0).padStart(5)
        + " " + (Math.ceil(t.hackThreads) ?? "0").toFixed(0).padStart(4)
        + " " + (Math.ceil(t.growThreads) ?? "0").toFixed(0).padStart(4)
        + " " + (Math.ceil(t.weakThreads) ?? "0").toFixed(0).padStart(4)
        + " " + (Math.ceil(t.moneyPerSec) ?? "0").toFixed(0).padStart(4)
        )
    }
}