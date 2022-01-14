import {data} from "./sys-database"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
    } else { 
        if (ns.args[0] == "set") {
            if (ns.args.length == 1) {
                Object.keys(data).sort().forEach(k => {
                    ns.tprint(k.padEnd(30, "_") + " " + (Array.isArray(data[k]) ? "Array[" + data[k].length + "]" : data[k]));
                });
            } else if (ns.args.length == 2) {
                if (Array.isArray(data[ns.args[1]])) {
                    ns.tprint("\n--- " + data[ns.args[1]].join("\n--- "));
                } else {
                    ns.tprint(data[ns.args[1]]);
                }
            } else if (data[ns.args[2]] !== null) {
                data[ns.args[1]] = ns.args[2]
            } else {
                ns.tprint("Not a valid setting")
            }
        } else if (ns.args[0] == "add") {
            data[ns.args[1]] = ns.args[2]
        } else if (ns.args[0] == "unset") {
            delete(data[ns.args[1]])
        }
    }
}