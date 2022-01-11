import * as pmem from "./lib-pmem.js"

/** @param {import("..").NS} ns **/
export async function main(ns) {
    await pmem.set(ns, "autorun.farm", true) 
    await pmem.set(ns, "autorun.gangs", true) 
    await pmem.set(ns, "autorun.hacknet", true) 
    await pmem.set(ns, "autorun.root", true) 
    await pmem.set(ns, "autorun.servers", true)
    await pmem.set(ns, "autorun.sleeves", true)
    await pmem.set(ns, "autorun.solver", true)
    await pmem.set(ns, "autorun.stocks", true)
}

export function build_env(ns) {
    // find servers
    // find exe files length
    
}