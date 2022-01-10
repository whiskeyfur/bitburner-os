/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.grow(ns.args[0])
    .then((resolve) => ns.tprint("Grew " 
        + ns.args[0] + " by " 
        + resolve.toFixed(3) + "% to " 
        + ns.getServerMoneyAvailable(ns.args[0]))
    );
}
export function autocomplete(data, args) {
    return [...data.servers];
}