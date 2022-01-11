import * as jcw from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    ns.disableLog("ALL");
    while (true) {
        ns.clearLog();

        var servers = await jcw.getServers(ns);
        servers
        .filter(s => ns.hasRootAccess(s))
        .sort((a,b) => ns.getServerMaxRam(a) - ns.getServerMaxRam(b))
        .forEach(s => 
            ns.print(
                s.padStart(18) 
                + " -- "
            )
        )
        await ns.sleep(1000)
    }
}
