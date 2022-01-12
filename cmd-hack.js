/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.hack(ns.args[0], {stock: true }).then((resolve) => {
        //ns.tprint("Hacked " + ns.args[0] + " for " + ns.nFormat(resolve.toFixed(2), "0a") + " bucks")
    });
}
export function autocomplete(data, args) {
    return [...data.servers];
}