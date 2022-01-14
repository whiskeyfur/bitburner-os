import {data} from "/sys/databases"
var trace = {};
var queue = [];

/** @param {import(".").NS} ns **/
export async function main(ns) {
    process(ns, "home", "START")
    //ns.tprint(trace);
    var ptr = ns.args[0];
    var route = [];
    while (trace[ptr]) {
        route.unshift(ptr)
        ptr = trace[ptr]
    }
    ns.tprint(route.join("; connect ")) 
}

/** @param {import(".").NS} ns **/
function process(ns, host, parent) {
    if (!trace[host]) {
        trace[host] = parent
        var ps = ns.scan(host)
        for (var dst of ps) {
            process(ns, dst, host)
        }
    }
}

export function autocomplete(data, args) {
    return [...data.servers]
}