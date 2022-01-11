/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.weaken(ns.args[0]).then((resolve) => ns.tprint(
        "Weakened " + ns.args[0] 
        + " by " + resolve 
        + " to " + ns.getServerSecurityLevel(ns.getHostname()) 
        + "/" + ns.getServerMinSecurityLevel(ns.getHostname())));
}
export function autocomplete(data, args) {
    return [...data.servers];
}