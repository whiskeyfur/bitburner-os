import * as Servers from "lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = await Servers.getServers(ns);
    
}