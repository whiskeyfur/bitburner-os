import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    while (true) {
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
        var limiter = 2;
        for (var t of targets) {
            var hackThreadsNeeded = 0
            var growThreadsNeeded = 0
            var weakenThreadsNeeded = 0

            if (ns.hasRootAccess(t)) {
                hackThreadsNeeded   = ns.hackAnalyzeThreads(t, ns.getServerMoneyAvailable(t) * 0.05)

                if (ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel()) {
                    hackThreadsNeeded = 0; // we can't hack this server
                    //growThreadsNeeded = Math.max(growThreadsNeeded, 100) // cap at 100
                }

                growThreadsNeeded   = ns.growthAnalyze(t, ns.getServerMaxMoney(t) / (ns.getServerMoneyAvailable(t)))
                
                weakenThreadsNeeded = (
                    ns.getServerSecurityLevel(t) 
                    - ns.getServerMinSecurityLevel(t)
                    + ns.growthAnalyzeSecurity(growThreadsNeeded) * ns.getWeakenTime(t) / ns.getGrowTime(t)
                    + ns.hackAnalyzeSecurity(hackThreadsNeeded)   * ns.getWeakenTime(t) / ns.getHackTime(t)
                    + 1
                ) / ns.weakenAnalyze(1);
                
            }

            ns.print(
                t.padStart(18)
                + " " + hackThreadsNeeded.toFixed(2).padStart(10)
                + " " + growThreadsNeeded.toFixed(2).padStart(10)
                + " " + weakenThreadsNeeded.toFixed(2).padStart(10)
            )

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
        await ns.sleep(100)
    }
    
}

/** @param {import(".").NS} ns **/
function incomePerSec(ns, s) {
    return ns.getServerMoneyAvailable(s) / ns.getHackTime(s) * ns.hackAnalyze(s)
}

/** @param {import(".").NS} ns **/
function distribute(ns, workers, script, threadsNeeded, target) {
    if (threadsNeeded > 0) {
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
}