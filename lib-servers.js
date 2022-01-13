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
    .filter(s => ns.hasRootAccess(s))
}

/** @param {import(".").NS} ns **/
export async function targets(ns) {
    return await getServers(ns)
    .filter(s => ns.getServerMoneyAvailable(s))
    .filter(s => ns.getServerRequiredHackingLevel(s) < ns.getHackingLevel(s))
}

/** @param {import(".").NS} ns **/
export function incomePerSec(ns, s) {
    if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(s) && ns.hasRootAccess(s))
        return ns.getServerMoneyAvailable(s) * ns.hackAnalyze(s) / ns.getHackTime(s) 
    else
        return 0;
        
}