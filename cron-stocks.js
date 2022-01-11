/** @param {import(".").NS} ns **/
export async function main(ns) {
    if (ns.getPlayer().hasTixApiAccess) {
        if (ns.getPlayer().has4SDataTixApi) {        
            ns.tail();
            ns.clearLog();
            var symbols = ns.stock.getSymbols()
            .sort((a,b) => ns.stock.getForecast(a) - ns.stock.getForecast(b));
            
            for (var sym of symbols) {
                var pos = ns.stock.getPosition(sym);
                var stk = ns.stock.getMaxShares(sym) * 0.01;
                var forecast = ns.stock.getForecast(sym);
                var price = ns.stock.getPrice(sym);
                if (forecast > 0.55 && pos[0] < stk) {
                    if (((stk - pos[0]) * price + 100000) < (ns.getPlayer().money / 20)) {
                        ns.stock.buy(sym, stk - pos[0]);
                        ns.tprint("Buying " + (stk - pos[0]) + " shares of " + sym + " at the cost of " + (price * (stk - pos[0]) + 100000))
                    }
                } else if (forecast < 0.5 && pos[0]) {
                    ns.stock.sell(sym, pos[0]);
                    ns.tprint("Selling " + pos[0] + " shares of " + sym + " for a profit of " + (pos[1] * price - 100000));
                }

                var pos = ns.stock.getPosition(sym);
                var price = ns.stock.getPrice(sym);
                if (pos[0]) {
                    ns.print(
                        sym.padStart(6) 
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
                }

            }
        }
    }
}
/*
// Stocks for companies at which you can work
StockSymbols[LocationName.AevumECorp] = "ECP";
StockSymbols[LocationName.AevumClarkeIncorporated] = "CLRK";
StockSymbols[LocationName.AevumFulcrumTechnologies] = "FLCM";
StockSymbols[LocationName.AevumAeroCorp] = "AERO";
StockSymbols[LocationName.AevumWatchdogSecurity] = "WDS";
StockSymbols[LocationName.AevumRhoConstruction] = "RHOC";
StockSymbols[LocationName.AevumNetLinkTechnologies] = "NTLK";
StockSymbols[LocationName.ChongqingKuaiGongInternational] = "KGI";
StockSymbols[LocationName.ChongqingSolarisSpaceSystems] = "SLRS";
StockSymbols[LocationName.IshimaStormTechnologies] = "STM";
StockSymbols[LocationName.IshimaNovaMedical] = "NVMD";
StockSymbols[LocationName.IshimaOmegaSoftware] = "OMGA";
StockSymbols[LocationName.NewTokyoDefComm] = "DCOMM";
StockSymbols[LocationName.NewTokyoVitaLife] = "VITA";
StockSymbols[LocationName.NewTokyoGlobalPharmaceuticals] = "GPH";
StockSymbols[LocationName.Sector12FourSigma] = "FSIG";
StockSymbols[LocationName.Sector12IcarusMicrosystems] = "ICRS";
StockSymbols[LocationName.Sector12UniversalEnergy] = "UNV";
StockSymbols[LocationName.Sector12AlphaEnterprises] = "APHE";
StockSymbols[LocationName.Sector12FoodNStuff] = "FNS";
StockSymbols[LocationName.Sector12JoesGuns] = "JGN";
StockSymbols[LocationName.Sector12MegaCorp] = "MGCP";
StockSymbols[LocationName.Sector12BladeIndustries] = "BLD";
StockSymbols[LocationName.VolhavenOmniTekIncorporated] = "OMTK";
StockSymbols[LocationName.VolhavenHeliosLabs] = "HLS";
StockSymbols[LocationName.VolhavenLexoCorp] = "LXO";
StockSymbols[LocationName.VolhavenSysCoreSecurities] = "SYSC";
StockSymbols[LocationName.VolhavenCompuTek] = "CTK";
StockSymbols[LocationName.VolhavenOmniaCybersystems] = "OMN";

// Stocks for other companies
StockSymbols["Sigma Cosmetics"] = "SGC";
StockSymbols["Catalyst Ventures"] = "CTYS";
StockSymbols["Microdyne Technologies"] = "MDYN";
StockSymbols["Titan Laboratories"] = "TITN";
*/