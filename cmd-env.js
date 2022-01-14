import {data} from "./sys-database"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
        ns.tprint("Fetching all...")
        Object.keys(data).forEach(k => {
            ns.tprint(k.padEnd(30, "_") + " " + data[k]);
        });
    } else {
        if (ns.args[0] == "set") {
            if (Object.keys(data).includes(ns.args[1])) data[ns.args[1]] = ns.args[2]
            else ns.tprint("Not a valid setting")
        } else if (ns.args[0] == "add") {
            data[ns.args[1]] = ns.args[2]
        } else if (ns.args[0] == "unset") {
            delete(data[ns.args[1]])
        }
    }
}

export async function autocomplete(d, args) {
    return Object.keys(data);
}