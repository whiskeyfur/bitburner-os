import {data} from "/sys/database"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    var servers = Object.keys(data[servers])
    for (var s of servers) {
        var files = ns.ls(s, ns.args[0]);
        if (files.length) 
            ns.tprint(`${s} -- ` + files.join(", "))
    }
}