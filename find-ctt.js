import * as Svrs from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = await Svrs.getServers(ns);
    for (var s of servers) {
        var files = ns.ls(s, ".cct");
        if (files.length) 
            ns.tprint("`${s} has contract files`")
    }
}