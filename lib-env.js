import * as jcw from "lib-common.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (!ns.fileExists("env.txt")) {
        await jcw.execAndWait(ns, "cmd-env.js", ns.getHostname(), 1,  "build")
    }
}