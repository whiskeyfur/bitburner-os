import {data} from "./sys-database.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    
    while (true) {
        await ns.asleep(1000)
        .then(result => {
            ns.clearLog()
            var files = (ns.ls("home", ".js")).filter(f => f.startsWith("cron-"));
            files.forEach(f => {
                var param = f.replace("-", ".").replace(".js","")
                if(!data[param])
                    data[param] = false

                if (data[param] && !ns.scriptRunning(f, ns.getHostname())) {
                    var pid = ns.exec(f, ns.getHostname());        
                }
            });
        })
    }
}