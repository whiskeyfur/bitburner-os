import * as Svrs from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = (await Svrs.getServers(ns))
    .filter(s => s != "home");
    ns.tprint(servers.length);
    for (var s of servers) {
        ns.tprint("cleaning out " + s)
        if (ns.ps(s).length) {
            ns.tprint(s + " refused to cooperate")
        }
    }
    
}