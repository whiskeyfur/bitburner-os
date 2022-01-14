import {data} from "/sys/database"
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
        
        data["log.gangs"] = ns.getScriptLogs()
    } else {
        data["cron.gangs"] = "ERR: Not in a gang"
    }
}