import {data} from "./sys-database.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.disableLog("ALL")
    while (true) {
        await ns.sleep(100);
        
        ns.clearLog()
        var files = (ns.ls("home", ".js")).filter(f => f.startsWith("cron-"));
        for (var f of files) {
            await ns.sleep(100);
            var param = f.replace("-", ".").replace(".js","")
            if(!data[param])
                data[param] = false


            if (data[param] === true) {
                if (ns.getScriptRam(f) > (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"))) {
                    data[param] = "ERR: Not enough memory"
                    data[param + ".error"] = ns.ps("home")
                } else {
                    delete(data[param + ".error"])
                    if (!ns.scriptRunning(f, ns.getHostname())) {
                        ns.print("Executing " + f)
                        var pid = ns.exec(f, "home");        
                    } else {
                        ns.print(f + " is running.")
                    }
                }

            }
            
            if ((data[param] === false) && ns.scriptRunning(f, ns.getHostname())) {
                ns.print("Killing " + f)
                var pid = ns.kill(f, "home");        
            }
        }
        data["log.crontab"] = ns.getScriptLogs()
    }
}