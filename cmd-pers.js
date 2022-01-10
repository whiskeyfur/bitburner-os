/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = ns.getPurchasedServers()
    .sort()
    .sort((a,b) => ns.getServerMaxRam(a) - ns.getServerMaxRam(b));
    for (var server of servers) {
        ns.tprint(server.padStart(16) + " " + ns.getServerMaxRam(server).toFixed(0).padStart(4) + "gb");
    }
}