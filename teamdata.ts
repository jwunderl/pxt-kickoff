//% fixedInstances
class TeamData {
    constructor(
        readonly name: string,
        readonly abbreviation: string,
        readonly colorOne: number,
        readonly colorTwo: number
    ) { }
}

namespace league {
    //% fixedInstance whenUsed
    export const arizonaCardinals = new TeamData("Arizona Cardinals", "ARI", 0x97233F, 0xFFB612);

    //% fixedInstance whenUsed
    export const atlantaFalcons = new TeamData("Atlanta Falcons", "ATL", 0xA71930, 0xA5ACAF);

    //% fixedInstance whenUsed
    export const baltimoreRavens = new TeamData("Baltimore Ravens", "BAL", 0x241773, 0x9E7C0C);

    //% fixedInstance whenUsed
    export const buffaloBills = new TeamData("Buffalo Bills", "BUF", 0x00338D, 0xC60C30);

    //% fixedInstance whenUsed
    export const carolinaPanthers = new TeamData("Carolina Panthers", "CAR", 0x0085CA, 0xBFC0BF);

    //% fixedInstance whenUsed
    export const chicagoBears = new TeamData("Chicago Bears", "CHI", 0x0B162A, 0xC83803);

    //% fixedInstance whenUsed
    export const cincinnatiBengals = new TeamData("Cincinnati Bengals", "CIN", 0xFB4F14, 0x000000);

    //% fixedInstance whenUsed
    export const clevelandBrowns = new TeamData("Cleveland Browns", "CLE", 0x311D00, 0xFF3C00);

    //% fixedInstance whenUsed
    export const dallasCowboys = new TeamData("Dallas Cowboys", "DAL", 0x003594, 0x041E42);

    //% fixedInstance whenUsed
    export const denverBroncos = new TeamData("Denver Broncos", "DEN", 0xFB4F14, 0x002244);

    //% fixedInstance whenUsed
    export const detroitLions = new TeamData("Detroit Lions", "DET", 0x0076B6, 0xB0B7BC);

    //% fixedInstance whenUsed
    export const greenBayPackers = new TeamData("Green Bay Packers", "GB", 0x203731, 0xFFB612);

    //% fixedInstance whenUsed
    export const houstonTexans = new TeamData("Houston Texans", "HOU", 0x03202F, 0xA71930);

    //% fixedInstance whenUsed
    export const indianapolisColts = new TeamData("Indianapolis Colts", "IND", 0x002C5F, 0xA2AAAD);

    //% fixedInstance whenUsed
    export const jacksonvilleJaguars = new TeamData("Jacksonville Jaguars", "JAX", 0xD7A22A, 0x006778);

    //% fixedInstance whenUsed
    export const kansasCityChiefs = new TeamData("Kansaas City Chiefs", "KC", 0xE31837, 0xFFB81C);

    //% fixedInstance whenUsed
    export const losAngelesChargers = new TeamData("Los Angeles Chargers", "LAC", 0x002A5E, 0xFFC20E);

    //% fixedInstance whenUsed
    export const losAngelesRams = new TeamData("Los Angeles Rams", "LA", 0x002244, 0x866D4B);

    //% fixedInstance whenUsed
    export const miamiDolphins = new TeamData("Miami Dolphins", "MIA", 0x008E97, 0xFC4C02);

    //% fixedInstance whenUsed
    export const minnesotaVikings = new TeamData("Minnesota Vikings", "MIN", 0x4F2683, 0xFFC62F);

    //% fixedInstance whenUsed
    export const newEnglandPatriots = new TeamData("New England Patriots", "NE", 0x002244, 0xC60C30);

    //% fixedInstance whenUsed
    export const newOrleans = new TeamData("New Orleans Saints", "NO", 0xD3BC8D, 0x101820);

    //% fixedInstance whenUsed
    export const newYorkGiants = new TeamData("New York Giants", "NYG", 0x0B2265, 0xA71930);

    //% fixedInstance whenUsed
    export const newYorkJets = new TeamData("New York Jets", "NYJ", 0x125740, 0x000000);

    //% fixedInstance whenUsed
    export const oakland = new TeamData("Oakland Raiders", "OAK", 0x000000, 0xA5ACAF);

    //% fixedInstance whenUsed
    export const philadelphia = new TeamData("Philadelphia Eagles", "PHI", 0x004C54, 0xACC0C6);

    //% fixedInstance whenUsed
    export const pittsburgh = new TeamData("Pittsburgh Steelers", "PIT", 0xFFB612, 0x003087);

    //% fixedInstance whenUsed
    export const seattle = new TeamData("Seattle Seahawks", "SEA", 0x002244, 0x69BE28);

    //% fixedInstance whenUsed
    export const sanFrancisco49ers = new TeamData("San Francisco 49ers", "SF", 0xAA0000, 0xB3995D);

    //% fixedInstance whenUsed
    export const tampaBay = new TeamData("Tampa Bay Buccaneers", "TB", 0xD50A0A, 0xFF7900);

    //% fixedInstance whenUsed
    export const tennessee = new TeamData("Tennessee Titans", "TEN", 0x0C2340, 0x418FDE);

    //% fixedInstance whenUsed
    export const washington = new TeamData("Washington Redskins", "WAS", 0x773141, 0xFFB612);
}