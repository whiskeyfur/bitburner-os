import * as env from "lib-env.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.exec("autostart.js", ns.getHostname())
}