export const data = {}
/** @param {NS} ns **/
export async function main(ns) {
	if (ns.fileExists("/data/state.txt")) {
		var d = JSON.parse(ns.read("/data/state.txt"));
		for (var k of Object.keys(d)) data[k] = d[k];
	}
	while (true) {
		ns.clearLog();
		for (var key of Object.keys(data).sort()) {
			ns.print(
				key.padEnd(25, "_")
				+ " " 
				+ JSON.stringify(data[key])
			);
		}
		await ns.write("/data/state.txt", JSON.stringify(data, null, 2), "w")
		await ns.sleep(1000)
	}
}