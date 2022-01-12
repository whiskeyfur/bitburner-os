import * as lib from "./lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    const hook2 = doc.getElementById('overview-extra-hook-2');
    try {
        const headers = []
        const values = [];

        var hacknetIncome = 0;
        for (var i = 0; i < ns.hacknet.numNodes(); i++) hacknetIncome += ns.hacknet.getNodeStats(i).production;

        headers.push("HackNet");
        values.push(ns.nFormat(hacknetIncome, "0a") + '/sec');

        var totalMemory = 0;
        var usedMemory = 0;
        (await lib.getServers(ns))
        .filter(s => ns.hasRootAccess(s))
        .filter(s => s != "home")
        .map(s => {
            totalMemory += ns.getServerMaxRam(s);
            usedMemory += ns.getServerUsedRam(s);
        });


        
        headers.push("Memory");
        values.push(totalMemory.toFixed(2));

        headers.push("- Used");
        values.push(usedMemory.toFixed(2));

        /*
        var shock = 0;
        var sync = 0;
        for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
            var stats = ns.sleeve.getSleeveStats(i);
            shock += stats.shock / ns.sleeve.getNumSleeves();
            sync += stats.sync / ns.sleeve.getNumSleeves();
        }

        headers.push("Shock");
        values.push(shock.toFixed(2));

        headers.push("Sync");
        values.push(sync.toFixed(2));
        */
        
        // Now drop it into the placeholder elements
        hook0.innerText = headers.join("\n");
        hook0.style.paddingRight = "1em";
        hook1.innerText = values.join("\n");
    } catch (err) { // This might come in handy later
        ns.tprint("ERROR: Update Skipped: " + String(err));
    }
}