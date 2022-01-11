import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    //ns.tail();
    ns.clearLog();
    ns.disableLog("ALL");

    var workers = (await Servers.getServers(ns))
    .filter(s => ns.hasRootAccess(s))
    .filter(s => s != "home")
    .sort((a,b) => 
        (ns.getServerMaxRam(b) - ns.getServerUsedRam(b)) -
        (ns.getServerMaxRam(a) - ns.getServerUsedRam(a))
    );
    for (var s of workers) await ns.scp(["cmd-hack.js", "cmd-weaken.js", "cmd-grow.js"], "home", s);

    // weaken
    var targets = (await Servers.getServers(ns))
    .filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    .filter(s => ns.getServerSecurityLevel(s) > ns.getServerMinSecurityLevel(s))
    .sort((a,b) => 
        (ns.getServerSecurityLevel(a) - ns.getServerMinSecurityLevel(a)) -
        (ns.getServerSecurityLevel(b) - ns.getServerMinSecurityLevel(b)) 
    );

    for (var t of targets) {
        var threadsNeeded = (ns.getServerSecurityLevel(t) - ns.getServerMinSecurityLevel(t)) / ns.weakenAnalyze(1);
        for (var w of workers) {
            for (var ps of ns.ps(w)) {
                if (ps.filename == "cmd-weaken.js" && ps.args[0] == t) {
                    threadsNeeded -= ps.threads;
                }
            }
        }
        distribute(ns, workers, "cmd-weaken.js", threadsNeeded, t)
    }

    // Growth
    targets = (await Servers.getServers(ns))
    .filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    .filter(s => ns.getServerMaxMoney(s))
    .filter(s => ns.getServerMoneyAvailable(s) < ns.getServerMaxMoney(s));

    for (var t of targets) {
        var threadsNeeded = ns.growthAnalyze(t, ns.getServerMaxMoney(t) / ns.getServerMoneyAvailable(t))
        for (var w of workers) {
            for (var ps of ns.ps(w)) {
                if (ps.filename == "cmd-grow.js" && ps.args[0] == t) 
                    threadsNeeded -= ps.threads
            }
        }
        distribute(ns, workers, "cmd-grow.js", threadsNeeded, t)
    }

    // Hack phase
    targets = (await Servers.getServers(ns))
    .filter(s => ns.getServerRequiredHackingLevel(s) <= ns.getHackingLevel())
    .filter(s => ns.getServerMaxMoney(s))
    .filter(s => ns.getServerMoneyAvailable(s) > ns.getServerMaxMoney(s) * 0.95)
    .sort((a,b) => (ns.getServerMoneyAvailable(b) * ns.hackAnalyze(b) * ns.hackAnalyzeChance(b))-(ns.getServerMoneyAvailable(a) * ns.hackAnalyze(a) * ns.hackAnalyzeChance(a)));

    for (var t of targets) {
        var threadsNeeded = Math.max(ns.hackAnalyzeThreads(t, ns.getServerMoneyAvailable(t) * 0.05), 1)
        var memAvail = ns.getServerMaxRam(w) - ns.getServerUsedRam(w);
        for (var w of workers) {
            for (var ps of ns.ps(w)) {
                if (ps.filename == "cmd-hack.js" && ps.args[0] == t) 
                    threadsNeeded -= ps.threads
            }
        }
        distribute(ns, workers, "cmd-hack.js", threadsNeeded, t)
    }

}

/** @param {import(".").NS} ns **/
function incomePerSec(ns, s) {
    return ns.getServerMoneyAvailable(s) / ns.getHackTime(s) * ns.hackAnalyze(s)
}

/** @param {import(".").NS} ns **/
function distribute(ns, workers, script, threadsNeeded, target) {
    for (var w of workers) {
        var memAvail = ns.getServerMaxRam(w) * (w == "home" ? 0 : 1) - ns.getServerUsedRam(w);
        var threads = Math.max(Math.min(Math.floor(memAvail / ns.getScriptRam(script)), threadsNeeded),1);
        if ((threadsNeeded > 0) && (memAvail > ns.getScriptRam(script))) {
            if (ns.exec(script, w, threads, target)) {
                threadsNeeded -= threads;
            }
        }
    }
}