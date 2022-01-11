/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.hack(ns.args[0]).then((resolve) => {
        if(false) {ns.tprint("Collected " + resolve + " from " + ns.args[0]);}
    });
}
export function autocomplete(data, args) {
    return [...data.servers];
}