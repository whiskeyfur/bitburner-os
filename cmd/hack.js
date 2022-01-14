/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.hack(ns.args[0], {stock: true }).then((resolve) => {
        let msg = "Hacked " + ns.args[0] + " for " + ns.nFormat(resolve.toFixed(2), "0a") + " bucks"
        
        if (ns.args[1] == "tprint")  ns.tprint(msg)
        else if (ns.args[1] == "log")     ns.print(msg)
        else if (ns.args[1] == "toast")   ns.toast(msg);
    });
}
export function autocomplete(data, args) {
    return [...data.servers];
}