import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    return false; // now handled by the cron-farm crontab
    var servers = (await Servers.getServers(ns))
    .filter (s => ns.getServerMaxMoney(s));
    for (var svr of servers) {
        var memAvail = ns.getServerMaxRam(svr) - ns.getServerUsedRam(svr);
        if (ns.getServerRequiredHackingLevel(svr) <= ns.getHackingLevel()) // is one we can hack,
        if (ns.getServerMoneyAvailable(svr) > 0 ) // and in fact HAS money.. no need to hack private servers!!!
        if (ns.getServerMoneyAvailable(svr) >= ns.getServerMaxMoney(svr) * 0.95) // is ripe for harvesting
        if (ns.getServerSecurityLevel(svr) <= ns.getServerMinSecurityLevel(svr) + 5) // weakened to an acceptable range
        if (memAvail > ns.getScriptRam("cmd-hack.js")) // and there's room to run at least one program in HALF the server's memory
        {
            await ns.scp("cmd-hack.js", svr);
            await ns.exec("cmd-hack.js", svr, Math.floor(memAvail / ns.getScriptRam("cmd-hack.js")), svr);
        }
    }
}