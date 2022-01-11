import * as Svrs from "./lib-servers.js"
/** @param {import(".").NS} ns **/
export async function main(ns) {
  var servers = await Svrs.getServers(ns);
  servers.sort((a,b) => incomePerSecond(ns,a) - incomePerSecond(ns,b))
  servers
  .filter(s => ns.getServerMoneyAvailable(s))
  .filter(s => ns.getServerMaxMoney(s))
  .filter(s => incomePerSecond(ns, s))
  .forEach(s => 
    ns.tprint(
      s.padStart(18) 
      + " -- "
      + ns.nFormat(ns.getServerMoneyAvailable(s), "0a").padStart(6)
      + " / "
      + ns.nFormat(ns.getServerMaxMoney(s), "0a").padStart(6)
      + " -- " 
      + ns.nFormat(incomePerSecond(ns, s) * 60, "0.00a") 
      + "/min"
    )
  )
}

function incomePerSecond(ns, s) {
  return ns.getServerMoneyAvailable(s) * ns.hackAnalyze(s) / ns.getHackTime(s);
}