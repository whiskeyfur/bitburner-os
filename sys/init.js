import {data} from "/sys/database"
/** @param {NS} ns **/
export async function main(ns) {
    let queue = ["home"];
	data["servers"] = {};
    while (queue.length) {
        let s = queue.pop();
        if (!data["servers"][s]) {
            data["servers"][s] = ns.getServer(s);
            let links = ns.scan(s);
            data["servers"][s]["links"] = links;
            for (let l of links) queue.unshift(l);
        }
    }
    
}