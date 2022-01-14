/** @param {import(".").NS} ns **/
export async function main(ns) {
    await ns.grow(ns.args[0]).then((resolve) => {
        let msg = "Grew " 
            + ns.args[0] + " by " 
            + resolve.toFixed(3) + "% to " 
            + ns.getServerMoneyAvailable(ns.args[0]);

             if (ns.args[1] == "tprint")  ns.tprint(msg)
        else if (ns.args[1] == "log")     ns.print(msg)
        else if (ns.args[1] == "toast")   ns.toast(msg);
    });
}
export function autocomplete(data, args) {
    return [...data.servers];
}