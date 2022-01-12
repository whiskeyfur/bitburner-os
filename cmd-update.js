/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (!ns.args.length) {
        var files = ns.ls("home");
        for (var file in files) {
            ns.exec(ns.getScriptName(), file)
        }
    } else {
        ns.wget("https://raw.githubusercontent.com/whiskeyfur/bitburner-os/master/" + file, file)
    }
}