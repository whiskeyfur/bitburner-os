/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("STARTUP")
	ns.tprint("Starting Database Service ..."); ns.exec("sys-database.js", "home")
	ns.tprint("Starting Crontab Service ... "); ns.exec("sys-crontab.js", "home")
}