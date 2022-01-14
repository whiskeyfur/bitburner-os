export const data = {};
export const logs = [];
/** @param {NS} ns **/
export async function main(ns) { 
	while (true) {
    	await ns.write("/logs/sys/database.txt", logs.join("\n"), "w")
    	await ns.write("/data/state.txt", JSON.stringify(data, null, 2), "w")
		while (logs.length) logs.pop();
		await ns.sleep(1000);
	}
}

/**
 * @param {string} key 
 * @param {string} val 
 **/
export function set(key, val) { 
	data[key] = val
	logs.push("Setting " + key + " to " + JSON.stringify(val))
}

/**
 * @param {string} key 
 **/
export function get(key = null) {
	if (key == null) return Object.keys(data).sort()
	else return data[key]
}

/**
 * @param {string} key 
 **/
export function unset(key) {
	delete(data[key])
	logs.push("unsetting " + key)
}