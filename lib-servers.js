/** @param {import(".").NS} ns **/
export async function main(ns) {
    // ns.tprint(await getServers(ns))
}
/** @param {import(".").NS} ns **/
export async function getServers(ns) {
    const nodes = new Set
    function dfs(node) {
        nodes.add(node);
        for (const neighbor of ns.scan(node)) {
            if (!nodes.has(neighbor)) {
                dfs(neighbor)
            }
        }
    }
    dfs("home")
    return [...nodes]
}


/** @param {import(".").NS} ns **/
export async function workers(ns) {
    return await getServers(ns)
    .filter(svr => ns.hasRootAccess(svr))
}

/** @param {import(".").NS} ns **/
export async function targets(ns) {
    return await getServers(ns)
    .filter(svrt => ns.getServerMoneyAvailable(svrt))
    .filter(svrt => ns.getServerRequiredHackingLevel(svrt) < ns.getHackingLevel(svrt))
}

/** @param {import(".").NS} ns **/
export function incomePerSec(ns, sinc) {
    if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(sinc) && ns.hasRootAccess(sinc))
        return ns.getServerMoneyAvailable(sinc) * ns.hackAnalyze(sinc) / ns.getHackTime(sinc) 
    else
        return 0;
        
}