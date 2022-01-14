import {data} from "/sys/database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    const hook2 = doc.getElementById('overview-extra-hook-2');
    try {
        const headers = Object.keys(data["ui"])
        const values = Object.values(data["ui"]);


        // Now drop it into the placeholder elements
        hook0.innerText = headers.join("\n");
        hook0.style.paddingRight = "1em";
        hook1.innerText = values.join("\n");

        
    } catch (err) { // This might come in handy later
        ns.tprint("ERROR: Update Skipped: " + String(err));
    }
}