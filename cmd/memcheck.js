/** @param {import(".").NS} ns **/
export async function main(ns) {
    for (var p of ns.ls("home", ".js")) {
        ns.tprint("" + ns.getScriptRam(p).toFixed(3).padStart(7) + "GB  " + p )
    }
}