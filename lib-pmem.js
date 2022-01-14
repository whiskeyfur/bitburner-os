var data = {}
export function getAll() { return data; }
export function get() { return data[key]; }
export function set(key, val) { data[key] = val; }
export function clear() { data = {} }
export function exists(key) { return Object.keys(data).includes(key) }