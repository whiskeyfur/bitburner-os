import {data} from "./sys-database"
/** @param {import(".").NS} ns **/
export async function main(ns) {

    let msg = ns.readPort(0)
    while (msg != "NULL PORT DATA") {
        msg = JSON.parse(data)
        

        msg = ns.readPort(0)
    }
}