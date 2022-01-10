/** @param {import(".").NS} ns **/
export async function main(ns) {
    const LocationName = {
    // Cities
    "Aevum" : "Aevum",
    "Chongqing" : "Chongqing",
    "Ishima" : "Ishima",
    "NewTokyo" : "New Tokyo",
    "Sector12" : "Sector-12",
    "Volhaven" : "Volhaven",
  
    // Aevum Locations
    "AevumAeroCorp" : "AeroCorp",
    "AevumBachmanAndAssociates" : "Bachman & Associates",
    "AevumClarkeIncorporated" : "Clarke Incorporated",
    "AevumCrushFitnessGym" : "Crush Fitness Gym",
    "AevumECorp" : "ECorp",
    "AevumFulcrumTechnologies" : "Fulcrum Technologies",
    "AevumGalacticCybersystems" : "Galactic Cybersystems",
    "AevumNetLinkTechnologies" : "NetLink Technologies",
    "AevumPolice" : "Aevum Police Headquarters",
    "AevumRhoConstruction" : "Rho Construction",
    "AevumSnapFitnessGym" : "Snap Fitness Gym",
    "AevumSummitUniversity" : "Summit University",
    "AevumWatchdogSecurity" : "Watchdog Security",
    "AevumCasino" : "Iker Molina Casino",
  
    // Chongqing locations
    "ChongqingKuaiGongInternational" : "KuaiGong International",
    "ChongqingSolarisSpaceSystems" : "Solaris Space Systems",
    "ChongqingChurchOfTheMachineGod" : "Church of the Machine God",
  
    // Sector 12
    "Sector12AlphaEnterprises" : "Alpha Enterprises",
    "Sector12BladeIndustries" : "Blade Industries",
    "Sector12CIA" : "Central Intelligence Agency",
    "Sector12CarmichaelSecurity" : "Carmichael Security",
    "Sector12CityHall" : "Sector-12 City Hall",
    "Sector12DeltaOne" : "DeltaOne",
    "Sector12FoodNStuff" : "FoodNStuff",
    "Sector12FourSigma" : "Four Sigma",
    "Sector12IcarusMicrosystems" : "Icarus Microsystems",
    "Sector12IronGym" : "Iron Gym",
    "Sector12JoesGuns" : "Joe's Guns",
    "Sector12MegaCorp" : "MegaCorp",
    "Sector12NSA" : "National Security Agency",
    "Sector12PowerhouseGym" : "Powerhouse Gym",
    "Sector12RothmanUniversity" : "Rothman University",
    "Sector12UniversalEnergy" : "Universal Energy",
  
    // New Tokyo
    "NewTokyoDefComm" : "DefComm",
    "NewTokyoGlobalPharmaceuticals" : "Global Pharmaceuticals",
    "NewTokyoNoodleBar" : "Noodle Bar",
    "NewTokyoVitaLife" : "VitaLife",
  
    // Ishima
    "IshimaNovaMedical" : "Nova Medical",
    "IshimaOmegaSoftware" : "Omega Software",
    "IshimaStormTechnologies" : "Storm Technologies",
    "IshimaGlitch" : "0x6C1",
  
    // Volhaven
    VolhavenCompuTek : "CompuTek",
    VolhavenHeliosLabs : "Helios Labs",
    VolhavenLexoCorp : "LexoCorp",
    VolhavenMilleniumFitnessGym : "Millenium Fitness Gym",
    VolhavenNWO : "NWO",
    VolhavenOmniTekIncorporated : "OmniTek Incorporated",
    VolhavenOmniaCybersystems : "Omnia Cybersystems",
    VolhavenSysCoreSecurities : "SysCore Securities",
    VolhavenZBInstituteOfTechnology : "ZB Institute of Technology",
  
    // Generic locations
    Hospital : "Hospital",
    Slums : "The Slums",
    TravelAgency : "Travel Agency",
    WorldStockExchange : "World Stock Exchange",
  
    // Default name for Location objects
    Void : "The Void",
  }
  const StockSymbols = {};
  
  // Stocks for companies at which you can work
  StockSymbols[LocationName.AevumECorp] = "ECP";
  StockSymbols[LocationName.Sector12MegaCorp] = "MGCP";
  StockSymbols[LocationName.Sector12BladeIndustries] = "BLD";
  StockSymbols[LocationName.AevumClarkeIncorporated] = "CLRK";
  StockSymbols[LocationName.VolhavenOmniTekIncorporated] = "OMTK";
  StockSymbols[LocationName.Sector12FourSigma] = "FSIG";
  StockSymbols[LocationName.ChongqingKuaiGongInternational] = "KGI";
  StockSymbols[LocationName.AevumFulcrumTechnologies] = "FLCM";
  StockSymbols[LocationName.IshimaStormTechnologies] = "STM";
  StockSymbols[LocationName.NewTokyoDefComm] = "DCOMM";
  StockSymbols[LocationName.VolhavenHeliosLabs] = "HLS";
  StockSymbols[LocationName.NewTokyoVitaLife] = "VITA";
  StockSymbols[LocationName.Sector12IcarusMicrosystems] = "ICRS";
  StockSymbols[LocationName.Sector12UniversalEnergy] = "UNV";
  StockSymbols[LocationName.AevumAeroCorp] = "AERO";
  StockSymbols[LocationName.VolhavenOmniaCybersystems] = "OMN";
  StockSymbols[LocationName.ChongqingSolarisSpaceSystems] = "SLRS";
  StockSymbols[LocationName.NewTokyoGlobalPharmaceuticals] = "GPH";
  StockSymbols[LocationName.IshimaNovaMedical] = "NVMD";
  StockSymbols[LocationName.AevumWatchdogSecurity] = "WDS";
  StockSymbols[LocationName.VolhavenLexoCorp] = "LXO";
  StockSymbols[LocationName.AevumRhoConstruction] = "RHOC";
  StockSymbols[LocationName.Sector12AlphaEnterprises] = "APHE";
  StockSymbols[LocationName.VolhavenSysCoreSecurities] = "SYSC";
  StockSymbols[LocationName.VolhavenCompuTek] = "CTK";
  StockSymbols[LocationName.AevumNetLinkTechnologies] = "NTLK";
  StockSymbols[LocationName.IshimaOmegaSoftware] = "OMGA";
  StockSymbols[LocationName.Sector12FoodNStuff] = "FNS";
  StockSymbols[LocationName.Sector12JoesGuns] = "JGN";
  
  // Stocks for other companies
  StockSymbols["Sigma Cosmetics"] = "SGC";
  StockSymbols["Catalyst Ventures"] = "CTYS";
  StockSymbols["Microdyne Technologies"] = "MDYN";
  StockSymbols["Titan Laboratories"] = "TITN";
  ns.write("symbols.txt", JSON.stringify(StockSymbols), "w");
}