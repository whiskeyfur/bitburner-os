import {data} from "/sys/database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
  var info = {"orgs" : {}, "servers" : {}}
  var servers = Object.keys(data["servers"]);
  for (var hostname of servers) {
    var server = ns.getServer(hostname);
    var org = server.organizationName;
    if (org) {
      if (!info.servers[hostname]) info.servers[hostname] = server;
      if (!info.orgs[org]) info.orgs[org] = { };
      if (!info.orgs[org].servers) info.orgs[org].servers = [];
      info.orgs[org].servers.push(hostname);
    }
  }
  Object.entries(stockSymbols).forEach(k => {
    if (!info.orgs[k[0]]) info.orgs[k[0]] = {}
    info.orgs[k[0]].stock = k[1];
  });

  ns.tprint(JSON.stringify(info, null, 2));
}

export let stockSymbols = {
  "ECorp":"ECP",
  "MegaCorp":"MGCP",
  "Blade Industries":"BLD",
  "Clarke Incorporated":"CLRK",
  "OmniTek Incorporated":"OMTK",
  "Four Sigma":"FSIG",
  "KuaiGong International":"KGI",
  "Fulcrum Technologies":"FLCM",
  "Storm Technologies":"STM",
  "DefComm":"DCOMM",
  "Helios Labs":"HLS",
  "VitaLife":"VITA",
  "Icarus Microsystems":"ICRS",
  "Universal Energy":"UNV",
  "AeroCorp":"AERO",
  "Omnia Cybersystems":"OMN",
  "Solaris Space Systems":"SLRS",
  "Global Pharmaceuticals":"GPH",
  "Nova Medical":"NVMD",
  "Watchdog Security":"WDS",
  "LexoCorp":"LXO",
  "Rho Construction":"RHOC",
  "Alpha Enterprises":"APHE",
  "SysCore Securities":"SYSC",
  "CompuTek":"CTK",
  "NetLink Technologies":"NTLK",
  "Omega Software":"OMGA",
  "FoodNStuff":"FNS",
  "Joe's Guns":"JGN",
  "Sigma Cosmetics":"SGC",
  "Catalyst Ventures":"CTYS",
  "Microdyne Technologies":"MDYN",
  "Titan Laboratories":"TITN"
}