import * as jcw from "lib-common.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    while (true) {
        ns.clearLog()
        var files = ns.ls("home", ".js").filter(f => f.startsWith("cron-"));
        files.forEach(f => {
            if (!ns.scriptRunning(f, ns.getHostname())) {
                var pid = ns.exec(f, ns.getHostname());        
            }
        });
        await ns.sleep(1500);
    }
}