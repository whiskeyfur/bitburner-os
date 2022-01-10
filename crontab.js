import * as jcw from "lib-common.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    while (true) {
        var files = await ns.ls("home", ".js");
        for (var f of files) {
            if (f.startsWith("cron-")) {
                if (ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname()) >= ns.getScriptRam(f))  {
                    await jcw.execAndWait(ns, f, ns.getHostname());
                }
            }
        }
        await ns.sleep(10);
    }
}