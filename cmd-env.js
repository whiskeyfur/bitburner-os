import * as pmem from "./lib-pmem.js"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
        ns.tprint("Fetching all...")
        var json = await pmem.getAll(ns)
        Object.keys(json).forEach(k => {
            ns.tprint(k.padEnd(30, "_") + " " + json[k]);
        });
    } else {
        if (ns.args[0] == "set") {
            if (await pmem.exists(ns, ns.args[1]))
                await pmem.set(ns, ns.args[1], ns.args[2])
            else
                ns.tprint("Not a valid setting")
        } else if (ns.args[0] == "get") {
            if (await pmem.exists(ns, ns.args[1]))
                ns.tprint(await pmem.get(ns, ns.args[1]))
            else
                ns.tprint("Not a valid setting")
        }
    }
}
