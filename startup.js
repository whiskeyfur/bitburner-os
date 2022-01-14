/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("STARTUP")
	ns.tprint("Starting Database Service ..."); ns.exec("/sys/database.js", "home")
	await ns.sleep(1000)
	ns.tprint("Starting Crontab Service ... "); ns.exec("/sys/crontab.js", "home")
	await ns.sleep(1000)
	ns.tprint("Initialization ... ");           ns.exec("/sys/init.js", "home")
}