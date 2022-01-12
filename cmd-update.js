/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (ns.args.length == 0) {
        var files = ns.ls("home", ".js").map(file => {
            ns.exec(ns.getScriptName(), "home", 1, file)
        })
    } else {
        await ns.wget(`https://raw.githubusercontent.com/whiskeyfur/bitburner-os/master/${ns.args[0]}`, ns.args[0], "home")
    }
    
}