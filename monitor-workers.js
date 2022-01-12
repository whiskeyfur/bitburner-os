import * as jcw from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    ns.disableLog("ALL");
    while (true) {
        ns.clearLog();

        var procs = []
        var servers = await jcw.getServers(ns);

        servers
        .forEach(s => {
            for (var ps of ns.ps(s)) procs.push({"file": ps.filename, "threads": ps.threads, "target": ps.args[0], "started": ps.args[1], "pid" : ps.pid, "host" : s})
        })
        //ns.tprint(procs);
        for (var ps of procs.sort((a,b) => getEndTime(ns,b) - getEndTime(ns,a))) {
            if (ps.file.startsWith("cmd-")) {
                var time = 0;
                if (ps.file == "cmd-hack.js") time = ns.getHackTime(ps.target);
                else if (ps.file == "cmd-weaken.js") time = ns.getWeakenTime(ps.target);
                else if (ps.file == "cmd-grow.js") time = ns.getGrowTime(ps.target);
                if (!ns.args.length || ns.args[0] == ps.target )
                ns.print(
                    `${ps.pid.toFixed(0).padStart(7)} x${ps.threads.toFixed(0).padEnd(4)} ${ps.file.padStart(14)} vs ${ps.target.padStart(18)} -- ${ns.tFormat(ps.started + time - ns.getTimeSinceLastAug(), false)}`
                )
            }
        }
        await ns.sleep(1000)
    }
}


/** @param {import(".").NS} ns **/
function getEndTime(ns, ps) {
    if (ps.file == "cmd-hack.js") return ps.started + ns.getHackTime(ps.target);
    if (ps.file == "cmd-grow.js") return ps.started + ns.getGrowTime(ps.target);
    if (ps.file == "cmd-weaken.js") return ps.started + ns.getWeakenTime(ps.target);
}

export function autocomplete(data, args) {
    return [...data.servers]
}