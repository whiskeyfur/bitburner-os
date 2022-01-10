/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.weaken(ns.args[0]).then((resolve) => ns.tprint("Weakened " + ns.args[0] + " by " + resolve));
}
export function autocomplete(data, args) {
    return [...data.servers];
}