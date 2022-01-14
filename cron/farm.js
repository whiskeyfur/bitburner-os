import {data} from "/sys/database"
import * as farm from "/lib/farm"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    data["farm.hack.limit"] = data["farm.hack.limit"] ?? 0
    data["farm.hack.enable"] = data["farm.hack.enable"] ?? true
    data["farm.grow.limit"] = data["farm.grow.limit"] ?? 0
    data["farm.grow.enable"] = data["farm.grow.enable"] ?? true
    data["farm.weaken.limit"] = data["farm.weaken.limit"] ?? 0
    data["farm.weaken.enable"] = data["farm.weaken.enable"] ?? true
    
    ns.clearLog();
    ns.disableLog("ALL");
    var workers = Object.keys(data["servers"])
    .filter(s => ns.hasRootAccess(s));

    for (var s of workers) {
        if (s.startsWith("hacknet") || s == "home") {
            data["farm." + s + ".use"] = data["farm." + s + ".use"] ?? 0;
        }
        await ns.scp(["/cmd/hack.js", "/cmd/weaken.js", "/cmd/grow.js"], "home", s);   
    }

    // weaken
    var targets = Object.keys(data["servers"])
    .filter(s => ns.getServerMoneyAvailable(s)) // zero servers are quite dead. You can't grow those.
    .filter(s => ns.getServerMaxMoney(s))       // And we don't want to hit home.
    //.filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    .sort((a,b) => ns.getServerRequiredHackingLevel(b) - ns.getServerRequiredHackingLevel(a))
    .sort((a,b) => farm.incomePerSec(ns,b) - farm.incomePerSec(ns,a))
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
                (ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel()) ||
                (ns.getServerMoneyAvailable(t) < (ns.getServerMaxMoney(t) * 0.95))
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

            if (data["farm.hack.limit"] > 0) hackThreadsNeeded = Math.min(hackThreadsNeeded, data["farm.hack.limit"])
            if (data["farm.hack.enable"] == false) hackThreadsNeeded = 0;

            if (data["farm.grow.limit"] > 0) growThreadsNeeded = Math.min(growThreadsNeeded, data["farm.grow.limit"]);
            if (data["farm.grow.enable"] === false) growThreadsNeeded = 0;

            if (data["farm.weaken.limit"] > 0) weakenThreadsNeeded = Math.min(weakenThreadsNeeded, data["farm.weaken.limit"]);
            if (data["farm.weaken.enable"] === false) weakenThreadsNeeded = 0;
            
            ns.print(
                t.padStart(18)
                + " " + hackThreadsNeeded.toFixed(2).padStart(10)
                + " " + growThreadsNeeded.toFixed(2).padStart(10)
                + " " + weakenThreadsNeeded.toFixed(2).padStart(10)
                + " " + (0).toFixed(2).padStart(6)
            )

            if (ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel() && growThreadsNeeded && weakenThreadsNeeded) {
                noMoreServers = true
            }

            for (var w of workers) {
                for (var ps of ns.ps(w)) {
                    if (ps.filename == "/cmd/weaken.js" && ps.args[0] == t) weakenThreadsNeeded -= ps.threads;
                    if (ps.filename == "/cmd/grow.js"   && ps.args[0] == t)   growThreadsNeeded -= ps.threads;
                    if (ps.filename == "/cmd/hack.js"   && ps.args[0] == t)   hackThreadsNeeded -= ps.threads;
                }
            }
        
            distribute(ns, workers, "/cmd/weaken.js", weakenThreadsNeeded, t)
            distribute(ns, workers, "/cmd/hack.js"  , hackThreadsNeeded, t)
            distribute(ns, workers, "/cmd/grow.js"  , growThreadsNeeded, t)
        
        } catch (ex) {
            ns.print("EXCEPTION: " + ex);
        }
        
        data["log.farm"] = ns.getScriptLogs()
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

            var memAvail = (data["farm." + w + ".use"] ?? ns.getServerMaxRam(w)) - ns.getServerUsedRam(w);
            var threads = Math.max(Math.min(Math.floor(memAvail / ns.getScriptRam(script)), threadsNeeded),1);
            if ((threadsNeeded > 0) && (memAvail > ns.getScriptRam(script))) {
                if (ns.exec(script, w, threads, target, ns.getTimeSinceLastAug())) {
                    threadsNeeded -= threads;
                }
            }
        }
    }
}