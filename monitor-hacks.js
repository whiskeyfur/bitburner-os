import * as jcw from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    ns.disableLog("ALL");
    while (true) {
        ns.clearLog();

        var servers = await jcw.getServers(ns);
        servers
        .sort((a,b) => ns.getServerMaxMoney(a) - ns.getServerMaxMoney(b))
        .filter(s => ns.getServerMoneyAvailable(s))
        .filter(s => ns.getServerMaxMoney(s))
        .filter(s => ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(s))
        .sort((a,b) => (ns.getServerMoneyAvailable(b) * ns.hackAnalyze(b) * ns.hackAnalyzeChance(b)) - (ns.getServerMoneyAvailable(a) * ns.hackAnalyze(a) * ns.hackAnalyzeChance(a)))
        .forEach(s => 
            ns.print(
                s.padStart(18) 
                + " -- "
                + ns.nFormat(ns.getServerMoneyAvailable(s), "0a").padStart(6)
                + " / "
                + ns.nFormat(ns.getServerMaxMoney(s), "0a").padStart(6)
                + " -- "
                + " W: " + find(ns, s, servers, "cmd-weaken.js").toFixed(0).padStart(4)
                + "  G: " + find(ns, s, servers, "cmd-grow.js").toFixed(0).padStart(4)
                + "  H: " + find(ns, s, servers, "cmd-hack.js").toFixed(0).padStart(4)
                + " -- " + ns.nFormat(ns.getServerMoneyAvailable(s) * ns.hackAnalyze(s) * ns.hackAnalyzeChance(s), "0a").padStart(6)
                + "/sec"
            )
        )
        await ns.sleep(1000)
    }
}

/** @param {import(".").NS} ns **/
function find(ns, server, workers, script) {
    var results = 0;
    for (var w of workers) {
        ns.ps(w)
        .filter(ps => ps.filename == script)
        .filter(ps => ps.args[0] == server)
        .map(ps => results += ps.threads)
    }
    return results;
}