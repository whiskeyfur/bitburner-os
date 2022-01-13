/** @param {import(".").NS} ns **/
export async function getAll(ns) {
    var json = JSON.parse(await ns.fileExists("persistent.txt") ? await ns.read("persistent.txt") : "{}");
    return json;
}
export async function get(ns, key) {
    var json = JSON.parse(await ns.fileExists("persistent.txt") ? await ns.read("persistent.txt") : "{}");
    return json[key];
}
export async function set(ns, key, val) {
    var json = JSON.parse(await ns.fileExists("persistent.txt") ? await ns.read("persistent.txt") : "{}");
    json[key] = val;
    ns.write("persistent.txt", JSON.stringify(json, null, 2), "w");
}

export async function exists(ns, key) {
    var json = JSON.parse(await ns.fileExists("persistent.txt") ? await ns.read("persistent.txt") : "{}");
    return Object.keys(json).includes(key)
}