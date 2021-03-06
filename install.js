/** @param {import(".").NS} ns **/
export async function main(ns) {
    for(let ps of ns.ps("home"))
        if (ps.filename != "reinstall.js") ns.kill(ps.filename, "home")
    
    if (
        await ns.prompt("Do you wish to start with a clean install? Note: this will wipe out --ALL-- Scripts on your home server.") &&
        await ns.prompt("Are you sure you want to wipe out every script on your server?")
    )
        for (let ext of [".js", ".ns", ".script", ".txt"])
        for (let f of ns.ls("home", ext))  
            ns.rm(f, "home");
    
}