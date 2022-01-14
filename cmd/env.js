import * as db from "/sys/database"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
    } else { 
        if (ns.args[0] == "set") {
            if (ns.args.length == 1)  {
                var keys = db.get()
                for (let key of keys) {
                    ns.tprint((key + " ").padEnd(60, "_") + " " + db.data[key])
                }
            } else if (db.get(ns.args[1]) !== null) {
                db.set(ns.args[1], ns.args[2]); 
            } else {
                ns.tprint("ERROR Not a valid setting")
            }
        } else if (ns.args[0] == "add") {
            db.set(ns.args[1], ns.args[2])
        } else if (ns.args[0] == "unset") {
            db.unset(ns.args[1])
        }
    }
    
    await ns.write("/logs/cmd/env.txt", ns.getScriptLogs().join("\n"), "w")
}