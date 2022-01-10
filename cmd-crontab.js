/** @param {import(".").NS} ns **/
export async function main(ns) {
    var files = ns.ls("home", "cron/.*.js");
    ns.tprint(files);
}