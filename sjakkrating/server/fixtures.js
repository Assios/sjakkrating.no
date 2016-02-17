// Fetch players from API if not found in db
function getAllPlayers() {
    var url = "http://assios.no:8888"

    var result = Meteor.http.get(url, {
        timeout: 15000
    });
    if (result.statusCode == 200) {
        var response = JSON.parse(result.content);
        console.log("Got all players.");
        return response;
    } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
    }
}


chess_clubs = [{
    "name": "1911",
    "website": "http://www.sk1911.no/"
}, {
    "name": "Aalesunds",
    "website": "http://alesundsjakk.no/"
}, {
    "name": "Akademisk",
    "website": "http://www.akademisk.org/"
}, {
    "name": "Alta",
    "website": "http://www.altasjakklubb.no/"
}, {
    "name": "Arendal",
    "website": "http://www.arendalsjakk.no/"
}, {
    "name": "Asker",
    "website": "http://www.askersjakk.no/"
}, {
    "name": "Aurskog-Høland",
    "website": ""
}, {
    "name": "Bergens",
    "website": "http://www.bergensjakk.no/"
}, {
    "name": "Black Knights",
    "website": ""
}, {
    "name": "Bodø",
    "website": "http://www.prpr.no/bsl"
}, {
    "name": "Brønnøysund",
    "website": "http://www.bronnoysundsjakklubb.net/"
}, {
    "name": "Bærum",
    "website": ""
}, {
    "name": "Caissa",
    "website": "http://www.caissa.no/"
}, {
    "name": "Direkte",
    "website": ""
}, {
    "name": "Drammens",
    "website": "http://www.drammensjakk.no/"
}, {
    "name": "Egersund",
    "website": ""
}, {
    "name": "Eidsvoll",
    "website": "http://www.eidsvollsjakklubb.no/"
}, {
    "name": "Elefantene",
    "website": "https://elefantenesjakk.wordpress.com/"
}, {
    "name": "Elverum",
    "website": "http://www.elverum.hedmarksjakk.net/"
}, {
    "name": "Fana",
    "website": "http://fanasjakk.blogspot.com/"
}, {
    "name": "Florø",
    "website": ""
}, {
    "name": "Folgefonn",
    "website": ""
}, {
    "name": "Follo",
    "website": "http://www.follosjakk.no/"
}, {
    "name": "Fredriksstad",
    "website": "http://www.sjakk.net/fss.php"
}, {
    "name": "Fribonden",
    "website": ""
}, {
    "name": "Frosta",
    "website": ""
}, {
    "name": "Førde",
    "website": "http://privat.enivest.net/~per.nestande/"
}, {
    "name": "Gjøvik",
    "website": "http://www.sjakk64.no/"
}, {
    "name": "Groruddalen",
    "website": "http://www.groruddalensjakk.no/"
}, {
    "name": "Guovdageainnu",
    "website": ""
}, {
    "name": "Halden",
    "website": "http://www.sjakk.net/halden.html"
}, {
    "name": "Hamar",
    "website": "http://hamar.hedmarksjakk.net/"
}, {
    "name": "Hammerfest",
    "website": "http://sjakklubb.no/"
}, {
    "name": "Harstad",
    "website": "http://www.harstadsjakklubb.no/"
}, {
    "name": "Hell",
    "website": "http://hellchess.com/"
}, {
    "name": "Holmestrand",
    "website": "http://hsjakk.blogspot.com/"
}, {
    "name": "Horten",
    "website": ""
}, {
    "name": "Hønefoss",
    "website": "http://www.honefossjakk.org/"
}, {
    "name": "Indre Østfold",
    "website": "http://www.sjakk.net/iof.html"
}, {
    "name": "Kampen",
    "website": "http://www.kampensjakk.no/"
}, {
    "name": "Kirkegata",
    "website": ""
}, {
    "name": "Kirkenes",
    "website": ""
}, {
    "name": "Klyve",
    "website": "http://www.skien.kommune.no/Lag-og-foreninger-i-Skien/Klyve-sjakklubb1/"
}, {
    "name": "Komsa",
    "website": "http://www.komsasjakklubb.no/"
}, {
    "name": "Kongsberg",
    "website": "http://www.kongsbergsjakk.net/"
}, {
    "name": "Kongsvinger",
    "website": "http://kongesjakk.origo.no/"
}, {
    "name": "Konnerud",
    "website": "http://www.konnerudsjakk.no/"
}, {
    "name": "Kragerø",
    "website": ""
}, {
    "name": "Kristiansand",
    "website": "http://www.kristiansandsjakk.no/"
}, {
    "name": "Kristiansund",
    "website": "http://ksk.no/"
}, {
    "name": "Larvik",
    "website": "http://www.larviksjakk.no/"
}, {
    "name": "Levanger",
    "website": ""
}, {
    "name": "Lillehammer",
    "website": ""
}, {
    "name": "Lillestrøm",
    "website": ""
}, {
    "name": "Longyearbyen",
    "website": ""
}, {
    "name": "Luster",
    "website": ""
}, {
    "name": "Lørenskog",
    "website": "http://www.lorenskogsjakk.com/"
}, {
    "name": "Masfjorden",
    "website": "http://www.masfjordensku.com/"
}, {
    "name": "Mo",
    "website": ""
}, {
    "name": "Modum",
    "website": "http://www.modumsjakken.no/"
}, {
    "name": "Molde",
    "website": "http://moldesjakklubb.net/"
}, {
    "name": "Mosjøen",
    "website": ""
}, {
    "name": "Moss",
    "website": "http://www.sjakknet.no"
}, {
    "name": "NSSF",
    "website": ""
}, {
    "name": "Namsos",
    "website": ""
}, {
    "name": "Narvik",
    "website": "http://www.narviksjakklubb.org/"
}, {
    "name": "Nittedal",
    "website": "http://www.nittedalsjakk.priv.no/"
}, {
    "name": "Nord-Odal",
    "website": ""
}, {
    "name": "Nordstrand",
    "website": "http://www.nordstrandsjakk.no/"
}, {
    "name": "OSS",
    "website": "http://sjakkselskapet.no/"
}, {
    "name": "Orkdal",
    "website": "http://orkdalsjakklubb.net/"
}, {
    "name": "Otta",
    "website": ""
}, {
    "name": "Porsgrunn",
    "website": "http://psk-sjakk.no/"
}, {
    "name": "Randaberg",
    "website": "http://randaberg-sjakklubb.com/"
}, {
    "name": "Rokaden",
    "website": ""
}, {
    "name": "Røros",
    "website": ""
}, {
    "name": "SK 96",
    "website": ""
}, {
    "name": "SMPOAÅ",
    "website": ""
}, {
    "name": "SOSS",
    "website": ""
}, {
    "name": "Samisk",
    "website": ""
}, {
    "name": "Sandnes",
    "website": "http://www.sandnessjakk.no/"
}, {
    "name": "Sarpsborg",
    "website": "http://www.sjakk.net/ssk.html"
}, {
    "name": "Sevland",
    "website": "http://sevlandsjakk.com/"
}, {
    "name": "Sortland",
    "website": "http://sortlandsjakklubb.com/"
}, {
    "name": "Sotra",
    "website": "http://www.sotrasjakk.no/"
}, {
    "name": "Stavanger",
    "website": "https://tvilsomttrekk.wordpress.com/"
}, {
    "name": "Steinkjer",
    "website": ""
}, {
    "name": "Stjernen",
    "website": "http://skstjernen.no/"
}, {
    "name": "Stjørdal",
    "website": ""
}, {
    "name": "Strand",
    "website": ""
}, {
    "name": "Strømmen",
    "website": "http://www.strommensjakk.com/"
}, {
    "name": "Svartlamon",
    "website": "http://www.slsl.no/"
}, {
    "name": "Søråshøgda",
    "website": ""
}, {
    "name": "Tempo",
    "website": ""
}, {
    "name": "Tinn",
    "website": ""
}, {
    "name": "Tromsø",
    "website": "http://tromsosjakk.no/"
}, {
    "name": "Trondheim",
    "website": "http://www.tsf.no/"
}, {
    "name": "Tønsberg",
    "website": "http://www.123hjemmeside.no/tonsberg_sjakklubb/"
}, {
    "name": "Ullr",
    "website": ""
}, {
    "name": "Vadsø",
    "website": "http://www.vadsosjakk.no/"
}, {
    "name": "Vestvågøy",
    "website": ""
}, {
    "name": "Volda Ørsta",
    "website": "http://www.vosjakk.no"
}, {
    "name": "Voss",
    "website": ""
}, {
    "name": "Våler",
    "website": ""
}, {
    "name": "Vålerenga",
    "website": ""
}, ]


players = _.values(getAllPlayers())[0];

for (i = 0; i < players.length; i++) {
    var temp_id = players[i].nsf_id;
    var already_existing_player = Players.findOne({nsf_id: temp_id});

    if (!(already_existing_player)) {
        Players.insert(players[i]);
        console.log("added player", players[i].name);
    }
    else {
        Players.update({nsf_id: temp_id}, { $set: { fide_standard: players[i].fide_standard, fide_rapid: players[i].fide_rapid, fide_blitz: players[i].fide_blitz, elo: players[i].elo, number_of_games: players[i].number_of_games }});
    }
}

// fide_standard: players[i].fide_standard, fide_rapid: players[i].fide_rapid, fide_blitz: players[i].fide_blitz }
// elo: players[i].elo, nsf_elo: players[i].nsf_elo, fide_elos: players[i].fide_elos, rapid_elos: players[i].rapid_elos, blitz_elos: players[i].blitz_elos, nsf_elos: players[i].nsf_elos, nsf_categories: players[i].nsf_categories, games: players[i].games

if (Clubs.find().count() === 0) {
    for (i = 0; i < chess_clubs.length; i++) {
        Clubs.insert(chess_clubs[i]);
    }
}
