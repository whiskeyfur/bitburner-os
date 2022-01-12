import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    //ns.tail();
    ns.clearLog();
    ns.disableLog("ALL");
    var threadLimit = 999999;


    var workers = (await Servers.getServers(ns))
    .filter(s => ns.hasRootAccess(s))
    .sort((a,b) => 
        (ns.getServerMaxRam(b) - ns.getServerUsedRam(b)) -
        (ns.getServerMaxRam(a) - ns.getServerUsedRam(a))
    );
    for (var s of workers) await ns.scp(["cmd-hack.js", "cmd-weaken.js", "cmd-grow.js"], "home", s);

    // weaken
    var targets = (await Servers.getServers(ns))
    .filter(s => ns.getServerMaxMoney(s))
    .filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    /*
    .sort((a,b) => 
        (ns.getServerSecurityLevel(a) - ns.getServerMinSecurityLevel(a)) -
        (ns.getServerSecurityLevel(b) - ns.getServerMinSecurityLevel(b)) 
    )
    */
    .sort((a,b) => ns.getServerRequiredHackingLevel(a) - ns.getServerRequiredHackingLevel(b))
    ;

    for (var t of targets) {
        var hackThreadsNeeded   = ns.hackAnalyzeThreads(t, ns.getServerMoneyAvailable(t) * 0.01)
        var growThreadsNeeded   = ns.growthAnalyze(t, ns.getServerMaxMoney(t) / ns.getServerMoneyAvailable(t) + 0.1)
        var weakenThreadsNeeded = (
            ns.growthAnalyzeSecurity(growThreadsNeeded)  * ns.getWeakenTime(t) / ns.getGrowTime(t)
            + ns.hackAnalyzeSecurity(hackThreadsNeeded)  * ns.getWeakenTime(t) / ns.getHackTime(t)
            + ns.getServerSecurityLevel(t)
            - ns.getServerMinSecurityLevel(t)
        ) / ns.weakenAnalyze(1)

        for (var w of workers) {
            for (var ps of ns.ps(w)) {
                if (ps.filename == "cmd-weaken.js" && ps.args[0] == t) weakenThreadsNeeded -= ps.threads;
                if (ps.filename == "cmd-grow.js"   && ps.args[0] == t)   growThreadsNeeded -= ps.threads;
                if (ps.filename == "cmd-hack.js"   && ps.args[0] == t)   hackThreadsNeeded -= ps.threads;
            }
        }

        distribute(ns, workers, "cmd-weaken.js", weakenThreadsNeeded, t)
        distribute(ns, workers, "cmd-hack.js"  , hackThreadsNeeded, t)
        distribute(ns, workers, "cmd-grow.js"  , growThreadsNeeded, t)
    }
    
}

/** @param {import(".").NS} ns **/
function incomePerSec(ns, s) {
    return ns.getServerMoneyAvailable(s) / ns.getHackTime(s) * ns.hackAnalyze(s)
}

/** @param {import(".").NS} ns **/
function distribute(ns, workers, script, threadsNeeded, target) {
    for (var w of workers
            .sort(
                (a,b) => (
                    (ns.getServerMaxRam(b) - ns.getServerUsedRam(b))
                    - (ns.getServerMaxRam(a) - ns.getServerUsedRam(a))
                )
            )
    ) {
        var memAvail = ns.getServerMaxRam(w) - (w == "home" ? 256 : 0) - ns.getServerUsedRam(w);
        var threads = Math.max(Math.min(Math.floor(memAvail / ns.getScriptRam(script)), threadsNeeded),1);
        if ((threadsNeeded > 0) && (memAvail > ns.getScriptRam(script))) {
            if (ns.exec(script, w, threads, target, ns.getTimeSinceLastAug())) {
                threadsNeeded -= threads;
            }
        }
    }
}