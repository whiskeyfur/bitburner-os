import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail()
    while (true) {
        ns.clearLog()
        ns.disableLog("ALL")
        var servers = (await Servers.getServers(ns))
        .filter(s => ns.getServerMaxMoney(s))
        .sort((a,b) => ns.getServerRequiredHackingLevel(b) - ns.getServerRequiredHackingLevel(a))

        ;
        for (var s of servers) {
            ns.print(
                s.padStart(18)
                + "   L:" + ns.getServerRequiredHackingLevel(s).toFixed(0).padStart(4)
                + "   H:" + (ns.getHackTime(s)/ 1000).toFixed(0).padStart(5)
                + "   G:" + (ns.getGrowTime(s)/ 1000).toFixed(0).padStart(5)
                + "   W:" + (ns.getWeakenTime(s)/ 1000).toFixed(0).padStart(5)
                + "   M:" + (ns.getServerMoneyAvailable(s) / ns.getServerMaxMoney(s) * 100).toFixed(2).padStart(7)
                + "   S:" + ("+" + (ns.getServerSecurityLevel(s) - ns.getServerMinSecurityLevel(s)).toFixed(3)).padStart(8)
                + " (" + ns.hackAnalyzeSecurity(1) + ")"

            )
        }
        await ns.sleep(500)
    }
}