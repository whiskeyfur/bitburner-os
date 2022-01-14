import * as db from "/sys/database"
/** @param {NS} ns **/
export async function main(ns) {
    let queue = ["home"];
    let data = {}
	while (queue.length) {
        let s = queue.pop();
        if (data[s] === null) {
            let svrinfo = ns.getServer(s)
            let links = ns.scan(s);
            svrinfo.links = links
            data[s] = svrinfo;
            for (let l of links) queue.unshift(l);
        }

    }
    db.set("servers", data)
    
    await ns.write("/logs/sys/init.txt", ns.getScriptLogs().join("\n"), "w")
}