/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.weaken(ns.args[0]).then((resolve) => {
        if (false) ns.tprint(
            "Weakened " + ns.args[0] 
            + " by " + resolve 
            + " to " + ns.getServerSecurityLevel(ns.getHostname(ns.args[0])) 
            + "/" + ns.getServerMinSecurityLevel(ns.getHostname(ns.args[0])))
    });
}
export function autocomplete(data, args) {
    return [...data.servers];
}