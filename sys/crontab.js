import * as db from "/sys/database"
/** @param {import("..").NS} ns **/
export async function main(ns) {
    ns.disableLog("ALL")
    let lastrun = ns.getTimeSinceLastAug();
    while (true) {
        ns.clearLog()
        var files = (ns.ls("home", ".js")).filter(f => f.startsWith("/cron/"));
        for (var f of files) {
            await ns.sleep(100);
            var param = f.replace(".js","").replace("/cron/", "cron.")
            var logLine = param + ": "
            if(db.get(param) == null)
                db.set(param, false)

            if (db.get(param) === true) {
                if (ns.getScriptRam(f) > (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"))) {
                    logLine += "disabling, not enough memory"
                    db.set(param, "ERR: Not enough memory")
                    db.set(param + ".error", ns.ps("home"))
                } else {
                    db.unset(param + ".error")
                    if (!ns.scriptRunning(f, ns.getHostname())) {
                        logLine += "Starting"
                        var pid = ns.exec(f, "home");        
                    } else {
                        logLine += "Running"
                    }
                }

            } else if ((db.get(param) === false) && ns.scriptRunning(f, ns.getHostname())) {
                logLine += "Aborting"
                var pid = ns.kill(f, "home");        
            } else if(db.get(param) == false) {
                logLine += "Disabled"
            }
            ns.print(logLine)
            //await ns.sleep(100);
        }
        ns.print("Elapsed time: " + ((ns.getTimeSinceLastAug() - lastrun) / 1000).toFixed(3))
        await ns.write("/logs/sys/crontab.txt", ns.getScriptLogs().join("\n"), "w")
        await ns.sleep(100)
        lastrun = ns.getTimeSinceLastAug();
    }
}