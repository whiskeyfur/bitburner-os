/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (ns.gang.inGang()) {
        var gang_info = ns.gang.getGangInformation()
        var mitigation = "";
        if (gang_info.isHacking) {
            mitigation = ""
        } else {
            mitigation = ""
        }
    }
}