import {data} from "/sys/database"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tail();
    ns.disableLog("ALL");
    while (true) {
        ns.clearLog()
        var symbols = ns.stock.getSymbols()
        .sort((a,b) => ns.stock.getForecast(a) - ns.stock.getForecast(b));
        for (var sym of symbols) {
            var pos = ns.stock.getPosition(sym)
            var price = ns.stock.getPrice(sym)
            var forecast = ns.stock.getForecast(sym)
            if (pos[0]) {
                ns.print(
                    sym.padStart(6) 
                    + " "
                    + forecast.toFixed(2).padStart(4)
                    + " "
                    + pos[0].toFixed(0).padStart(7)
                    + " @ " 
                    + price.toFixed(2).padStart(8)
                    + " = "
                    + ns.nFormat(pos[0] * price, "0a").padStart(5)
                    + " (" 
                    + (price / pos[1] * 100).toFixed(0)
                    + "%)"


                )
            } else {
                ns.print(
                    sym.padStart(6) 
                    + " "
                    + forecast.toFixed(2).padStart(4)
                    + " "
                    + pos[0].toFixed(0).padStart(7)
                    + " @ " 
                    + price.toFixed(2).padStart(8)
                )
            }
        }

        await ns.sleep(1000)
    }
}
