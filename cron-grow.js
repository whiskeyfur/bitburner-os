import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    return false; // now handled by the cron-farm crontab
    var servers = await Servers.getServers(ns);
    for (var svr of servers) {
        var memAvail = ns.getServerMaxRam(svr) - ns.getServerUsedRam(svr);
        if (ns.getServerRequiredHackingLevel(svr) <= ns.getHackingLevel()) // is one we can hack,
        if (ns.getServerMoneyAvailable(svr) < ns.getServerMaxMoney(svr)) // has room to grow.
        if (ns.getServerSecurityLevel(svr) == ns.getServerMinSecurityLevel(svr)) // weakened as far as it'll go
        if (memAvail > ns.getScriptRam("cmd-grow.js")) // and there's room to run at least one program in HALF the server's memory
        {
            await ns.scp("cmd-grow.js", svr);
            await ns.exec("cmd-grow.js", svr, Math.floor(memAvail / ns.getScriptRam("cmd-grow.js")), svr);
        }
    }
}