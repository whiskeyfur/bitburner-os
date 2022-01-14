//import * as jcw from "./lib-servers.js"
import {data} from "./sys-database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.clearLog()
    ns.disableLog("ALL")
    let files = [
        ["brutessh.exe", ns.brutessh],
        ["ftpcrack.exe", ns.ftpcrack],
        ["relaysmtp.exe", ns.relaysmtp],
        ["httpworm.exe", ns.httpworm],
        ["sqlinject.exe", ns.sqlinject]
    ].filter(f => ns.fileExists(f[0], "home"))

    var servers = Object.keys(data["data.servers"])
    for (var svr of servers) {
        var s = ns.getServer(svr)

        if (!ns.hasRootAccess(svr)) {
            if (s.numOpenPortsRequired <= files.length) {
                for(let file of files) {
                    file[1](svr)
                }
            }
            
            try {ns.nuke(svr)} catch {};
            if (ns.hasRootAccess(svr)) {
                ns.print("Nuked " + svr + "!")
            }
            try {ns.installBackdoor(svr)} catch {};
        }
    }
    data["log.root"] = ns.getScriptLogs();
}