import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = await Servers.getServers(ns);
    for (var svr of servers) {
        var memAvail = (ns.getServerMaxRam(svr)/2) - ns.getServerUsedRam(svr);
        if (ns.getServerRequiredHackingLevel(svr) <= ns.getHackingLevel()) // is one we can hack,
        if (ns.getServerSecurityLevel(svr) > ns.getServerMinSecurityLevel(svr)) // needs to be weakened,
        if (memAvail > ns.getScriptRam("cmd-weaken.js")) // and there's room to run at least one program in HALF the server's memory
        {
            await ns.scp("cmd-weaken.js", svr);
            await ns.exec("cmd-weaken.js", svr, Math.floor(memAvail / ns.getScriptRam("cmd-weaken.js")), svr);
        }
    }
}