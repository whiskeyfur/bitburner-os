/** @param {import("..").NS} ns **/
export async function main(ns) {
    ns.tprint("starting...")
    if (!ns.args.length) {
        
    } else {
        switch(ns.args[0]) {
            case "build":
                build_env(ns);
                break;
        }
    }
    ns.tprint("done")
}

export function build_env(ns) {
    // find servers
    // find exe files length
    
}