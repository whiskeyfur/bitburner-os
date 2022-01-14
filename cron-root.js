import * as jcw from "./lib-servers.js"

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var servers = await jcw.getServers(ns)
    for (var svr of servers) {
        if (!ns.hasRootAccess(svr)) {
            try {ns.brutessh(svr)} catch {};
            try {ns.ftpcrack(svr)} catch {};
            try {ns.relaysmtp(svr)} catch {};
            try {ns.httpworm(svr)} catch {};
            try {ns.sqlinject(svr)} catch {};
            try {ns.nuke(svr)} catch {};
            if (ns.hasRootAccess(svr)) {
                ns.tprint("Nuked " + svr + "!")
            }
            try {ns.installBackdoor(svr)} catch {};
        }
    }
}