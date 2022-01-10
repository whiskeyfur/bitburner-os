/** @param {import("..").NS} ns **/
export async function main(ns) {
    const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    const hook2 = doc.getElementById('overview-extra-hook-2');
    try {
        
        const headers = []
        const values = [];

        // Add script exp gain rate per second
        headers.push("HackExp");
        values.push(ns.nFormat(ns.getScriptExpGain(), "0a") + '/sec');

        // Add script income per second
        headers.push("HackInc");
        values.push(ns.nFormat(ns.getScriptIncome()[0], "0a") + '/sec');


        var hacknetIncome = 0;
        for (var i = 0; i < ns.hacknet.numNodes(); i++) hacknetIncome += ns.hacknet.getNodeStats(i).production;

        headers.push("HackNet");
        values.push(ns.nFormat(hacknetIncome, "0a") + '/sec');

        
        
        // Now drop it into the placeholder elements
        hook0.innerText = headers.join("\n");
        hook0.style.paddingRight = "1em";
        hook1.innerText = values.join("\n");
    } catch (err) { // This might come in handy later
        ns.tprint("ERROR: Update Skipped: " + String(err));
    }
}