/** @param {import(".").NS} ns **/
export async function get(ns, key) {
    var json = JSON.parse(ns.fileExists("persistent.txt") ? ns.read("persistent.txt") : "{}");
    return json[key];
}
export async function set(ns, key, val) {
    var json = JSON.parse(ns.fileExists("persistent.txt") ? ns.read("persistent.txt") : "{}");
    json[key] = val;
    ns.write("persistent.txt", JSON.stringify(json), "w");
}