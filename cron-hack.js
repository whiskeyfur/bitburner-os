import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = await Servers.getServers(ns);
    for (var svr of servers) {
        var memAvail = (ns.getServerMaxRam(svr)/2) - ns.getServerUsedRam(svr);
        if (ns.getServerRequiredHackingLevel(svr) <= ns.getHackingLevel()) // is one we can hack,
        if (ns.getServerMoneyAvailable(svr) == ns.getServerMaxMoney(svr)) // has room to grow.
        if (ns.getServerMoneyAvailable(svr) > 0 ) // and in fact HAS money.. no need ot hack private servers!!!
        if (memAvail > ns.getScriptRam("cmd-hack.js")) // and there's room to run at least one program in HALF the server's memory
        {
            await ns.scp("cmd-hack.js", svr);
            await ns.exec("cmd-hack.js", svr, Math.floor(memAvail / ns.getScriptRam("cmd-hack.js")), svr);
        }
    }
}