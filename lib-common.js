/** @param {import(".").NS} ns **/
export async function execAndWait(ns, script, host, threads =1,...args) {
    var pid = ns.exec(script, host, threads, ...args);
    while (ns.ps(host).filter(p => p.pid == pid).length) {await ns.sleep(10)};
    return;
}