import {data} from "/sys/database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = ns.getPurchasedServers();
    if (servers.length < ns.getPurchasedServerLimit()) {
        var cost = ns.getPurchasedServerCost(8);
        if (cost < ns.getPlayer().money) {
            var host = ns.purchaseServer("private", 8);
            ns.tprint("purchased new server '" + host + "' for " + cost)
        }
    } else if (servers.length) {
        servers
        .sort()
        .sort((a,b) => ns.getServerMaxRam(a) - ns.getServerMaxRam(b))
        ;
        var server = servers[0];
        var ram = ns.getServerMaxRam(server);
        if (ns.getPurchasedServerCost(ram * 2) < ns.getPlayer().money / 20) {
            if (ram < ns.getPurchasedServerMaxRam()) {
                ns.killall(server);
                ns.deleteServer(server);
                var host = ns.purchaseServer("private", ram * 2);
                ns.tprint("Replaced '" + server + "' (" + ram+ " GB) with '" + host + "' (" + (ram * 2)+ " GB)")
            }
        }
    } else if (ns.getPurchasedServerLimit() == 0) {
        // this bitnode doesn't support purchased servers...
        data["cron.servers"] = "ERR: Denied by Bitnode";
    }
}