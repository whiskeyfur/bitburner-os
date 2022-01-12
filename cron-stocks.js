/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (ns.getPlayer().hasTixApiAccess) {
        if (ns.getPlayer().has4SDataTixApi) {        
            var symbols = ns.stock.getSymbols()
            .sort((a,b) => ns.stock.getForecast(b) - ns.stock.getForecast(a));
            
            for (var sym of symbols) {
                var pos = ns.stock.getPosition(sym);
                var stk = ns.stock.getMaxShares(sym) * 0.01;
                var forecast = ns.stock.getForecast(sym);
                var price = ns.stock.getPrice(sym);
                if (forecast > 0.50 && pos[0] < stk) {
                    if (((stk - pos[0]) * price + 100000) < (ns.getPlayer().money / 20)) {
                        ns.stock.buy(sym, stk - pos[0]);
                        ns.tprint("Buying " + (stk - pos[0]) + " shares of " + sym + " at the cost of " + ns.nFormat(price * (stk - pos[0]) + 100000, "0a"))
                    }
                } else if (forecast < 0.5 && pos[0]) {
                    ns.stock.sell(sym, pos[0]);
                    ns.tprint("Selling " + pos[0] + " shares of " + sym + " for a profit of " + ns.nFormat(pos[1] * price - 100000, "0a"));
                }
            }
        }
    }
}