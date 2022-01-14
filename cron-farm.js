import * as jcw from "lib-servers.js"
import {data} from "sys-database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.clearLog();
    ns.disableLog("ALL");
    var threadLimit = 999999;

    var workers = (await jcw.getServers(ns))
    .filter(s => ns.hasRootAccess(s));

    for (var s of workers) {
        if (s.startsWith("hacknet") || s == "home") {
            data["farm." + s + ".use"] = data["farm." + s + ".use"] ?? 0;
        }
        await ns.scp(["cmd-hack.js", "cmd-weaken.js", "cmd-grow.js"], "home", s);   
    }

    // weaken
    var targets = (await jcw.getServers(ns))
    .filter(s => ns.getServerMoneyAvailable(s)) // zero servers are quite dead. You can't grow those.
    .filter(s => ns.getServerMaxMoney(s))       // And we don't want to hit home.
    //.filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    .sort((a,b) => ns.getServerRequiredHackingLevel(b) - ns.getServerRequiredHackingLevel(a))
    .sort((a,b) => jcw.incomePerSec(ns,a) - jcw.incomePerSec(ns,b))
    ;
    ns.print("targets: " + targets.length);
    var noMoreServers = false
    ns.print(
        "Server".padStart(18)
        + "Hack".padStart(11)
        + "Grow".padStart(11)
        + "Weak".padStart(11)
    )
    for (var t of targets) {
        
        if (!noMoreServers)
        try {
            
            var hackThreadsNeeded = 0
            var growThreadsNeeded = 0
            var weakenThreadsNeeded = 0

            hackThreadsNeeded   = ns.hackAnalyzeThreads(t, ns.getServerMoneyAvailable(t) * 0.05)

            if (
                ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel() ||
                ns.getServerMoneyAvailable(t) < ns.getServerMaxMoney(t) / 2
            ) {
                hackThreadsNeeded = 0; // we can't hack this server
            }

            growThreadsNeeded = ns.growthAnalyze(t, ns.getServerMaxMoney(t) / ns.getServerMoneyAvailable(t))
            
            weakenThreadsNeeded = (
                ns.getServerSecurityLevel(t) 
                - ns.getServerMinSecurityLevel(t)
                + ns.growthAnalyzeSecurity(growThreadsNeeded) * ns.getWeakenTime(t) / ns.getGrowTime(t)
                + ns.hackAnalyzeSecurity(hackThreadsNeeded)   * ns.getWeakenTime(t) / ns.getHackTime(t)
                + 1
            ) / ns.weakenAnalyze(1);

            ns.print(
                t.padStart(18)
                + " " + hackThreadsNeeded.toFixed(2).padStart(10)
                + " " + growThreadsNeeded.toFixed(2).padStart(10)
                + " " + weakenThreadsNeeded.toFixed(2).padStart(10)
                + " " + weakenThreadsNeeded.toFixed(2).padStart(10)
                + " " + incomePerSec(ns, t).toFixed(2).padStart(6)
            )

            if (ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel() && growThreadsNeeded && weakenThreadsNeeded) {
                noMoreServers = true
            }

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
        
        } catch (ex) {
            ns.print(ex);
        }
    }
    
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

            var memAvail = (data["farm." + s + ".use"] ?? ns.getServerMaxRam(w)) - ns.getServerUsedRam(w);
            var threads = Math.max(Math.min(Math.floor(memAvail / ns.getScriptRam(script)), threadsNeeded),1);
            if ((threadsNeeded > 0) && (memAvail > ns.getScriptRam(script))) {
                if (ns.exec(script, w, threads, target, ns.getTimeSinceLastAug())) {
                    threadsNeeded -= threads;
                }
            }
        }
    }
}