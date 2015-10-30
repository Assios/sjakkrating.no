// Fetch players from API if not found in db
function getAllPlayers() {
    var url = "http://assios.no:8888"

    var result = Meteor.http.get(url, {
        timeout: 15000
    });
    if (result.statusCode == 200) {
        var response = JSON.parse(result.content);
        console.log("Got all players:");
        return response;
    } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
    }
}

chess_clubs = [{
    "club_name": "1911",
    "website": "http://www.sk1911.no/"
}, {
    "club_name": "Aalesunds",
    "website": "http://alesundsjakk.no/"
}, {
    "club_name": "Akademisk",
    "website": "http://www.akademisk.org/"
}, {
    "club_name": "Alta",
    "website": "http://www.altasjakklubb.no/"
}, {
    "club_name": "Arendal",
    "website": "http://www.arendalsjakk.no/"
}, {
    "club_name": "Asker",
    "website": "http://www.askersjakk.no/"
}, {
    "club_name": "Aurskog-Høland",
    "website": ""
}, {
    "club_name": "Bergens",
    "website": "http://www.bergensjakk.no/"
}, {
    "club_name": "Black Knights",
    "website": ""
}, {
    "club_name": "Bodø",
    "website": ""
}, {
    "club_name": "Brønnøysund",
    "website": "http://www.bronnoysundsjakklubb.net/"
}, {
    "club_name": "Bærum",
    "website": ""
}, {
    "club_name": "Caissa",
    "website": "http://www.caissa.no/"
}, {
    "club_name": "Direkte",
    "website": ""
}, {
    "club_name": "Drammens",
    "website": "http://www.drammensjakk.no/"
}, {
    "club_name": "Egersund",
    "website": ""
}, {
    "club_name": "Eidsvoll",
    "website": "http://www.eidsvollsjakklubb.no/"
}, {
    "club_name": "Elefantene",
    "website": "https://elefantenesjakk.wordpress.com/"
}, {
    "club_name": "Elverum",
    "website": "http://www.elverum.hedmarksjakk.net/"
}, {
    "club_name": "Fana",
    "website": "http://fanasjakk.blogspot.com/"
}, {
    "club_name": "Florø",
    "website": ""
}, {
    "club_name": "Folgefonn",
    "website": ""
}, {
    "club_name": "Follo",
    "website": "http://www.follosjakk.no/"
}, {
    "club_name": "Fredriksstad",
    "website": "http://www.sjakk.net/fss.php"
}, {
    "club_name": "Fribonden",
    "website": ""
}, {
    "club_name": "Frosta",
    "website": ""
}, {
    "club_name": "Førde",
    "website": "http://privat.enivest.net/~per.nestande/"
}, {
    "club_name": "Gjøvik",
    "website": "http://www.sjakk64.no/"
}, {
    "club_name": "Groruddalen",
    "website": "http://www.groruddalensjakk.no/"
}, {
    "club_name": "Guovdageainnu",
    "website": ""
}, {
    "club_name": "Halden",
    "website": "http://www.sjakk.net/halden.html"
}, {
    "club_name": "Hamar",
    "website": "http://hamar.hedmarksjakk.net/"
}, {
    "club_name": "Hammerfest",
    "website": "http://sjakklubb.no/"
}, {
    "club_name": "Harstad",
    "website": "http://www.harstadsjakklubb.no/"
}, {
    "club_name": "Hell",
    "website": "http://hellchess.com/"
}, {
    "club_name": "Holmestrand",
    "website": "http://hsjakk.blogspot.com/"
}, {
    "club_name": "Horten",
    "website": ""
}, {
    "club_name": "Hønefoss",
    "website": "http://www.honefossjakk.org/"
}, {
    "club_name": "Indre Østfold",
    "website": "http://www.sjakk.net/iof.html"
}, {
    "club_name": "Kampen",
    "website": "http://www.kampensjakk.no/"
}, {
    "club_name": "Kirkegata",
    "website": ""
}, {
    "club_name": "Kirkenes",
    "website": ""
}, {
    "club_name": "Klyve",
    "website": "http://www.skien.kommune.no/Lag-og-foreninger-i-Skien/Klyve-sjakklubb1/"
}, {
    "club_name": "Komsa",
    "website": "http://www.komsasjakklubb.no/"
}, {
    "club_name": "Kongsberg",
    "website": "http://www.kongsbergsjakk.net/"
}, {
    "club_name": "Kongsvinger",
    "website": "http://kongesjakk.origo.no/"
}, {
    "club_name": "Konnerud",
    "website": "http://www.konnerudsjakk.no/"
}, {
    "club_name": "Kragerø",
    "website": ""
}, {
    "club_name": "Kristiansand",
    "website": "http://www.kristiansandsjakk.no/"
}, {
    "club_name": "Kristiansund",
    "website": "http://ksk.no/"
}, {
    "club_name": "Larvik",
    "website": "http://www.larviksjakk.no/"
}, {
    "club_name": "Levanger",
    "website": ""
}, {
    "club_name": "Lillehammer",
    "website": ""
}, {
    "club_name": "Lillestrøm",
    "website": ""
}, {
    "club_name": "Longyearbyen",
    "website": ""
}, {
    "club_name": "Luster",
    "website": ""
}, {
    "club_name": "Lørenskog",
    "website": "http://www.lorenskogsjakk.com/"
}, {
    "club_name": "Masfjorden",
    "website": "http://www.masfjordensku.com/"
}, {
    "club_name": "Mo",
    "website": ""
}, {
    "club_name": "Modum",
    "website": "http://www.modumsjakken.net/"
}, {
    "club_name": "Molde",
    "website": "http://moldesjakklubb.net/"
}, {
    "club_name": "Mosjøen",
    "website": ""
}, {
    "club_name": "Moss",
    "website": "http://www.sjakknet.no"
}, {
    "club_name": "NSSF",
    "website": ""
}, {
    "club_name": "Namsos",
    "website": ""
}, {
    "club_name": "Narvik",
    "website": "http://www.narviksjakklubb.org/"
}, {
    "club_name": "Nittedal",
    "website": "http://www.nittedalsjakk.priv.no/"
}, {
    "club_name": "Nord-Odal",
    "website": ""
}, {
    "club_name": "Nordstrand",
    "website": "http://www.nordstrandsjakk.no/"
}, {
    "club_name": "OSS",
    "website": "http://sjakkselskapet.no/"
}, {
    "club_name": "Orkdal",
    "website": "http://orkdalsjakklubb.net/"
}, {
    "club_name": "Otta",
    "website": ""
}, {
    "club_name": "Porsgrunn",
    "website": ""
}, {
    "club_name": "Randaberg",
    "website": "http://randaberg-sjakklubb.com/"
}, {
    "club_name": "Rokaden",
    "website": ""
}, {
    "club_name": "Røros",
    "website": ""
}, {
    "club_name": "SK 96",
    "website": ""
}, {
    "club_name": "SMPOAÅ",
    "website": ""
}, {
    "club_name": "SOSS",
    "website": ""
}, {
    "club_name": "Samisk",
    "website": ""
}, {
    "club_name": "Sandnes",
    "website": "http://www.sandnessjakk.no/"
}, {
    "club_name": "Sarpsborg",
    "website": "http://www.sjakk.net/ssk.html"
}, {
    "club_name": "Sevland",
    "website": "http://sevlandsjakk.com/"
}, {
    "club_name": "Sortland",
    "website": "http://sortlandsjakklubb.com/"
}, {
    "club_name": "Sotra",
    "website": "http://www.sotrasjakk.no/"
}, {
    "club_name": "Stavanger",
    "website": "https://tvilsomttrekk.wordpress.com/"
}, {
    "club_name": "Steinkjer",
    "website": ""
}, {
    "club_name": "Stjernen",
    "website": "http://skstjernen.no/"
}, {
    "club_name": "Stjørdal",
    "website": ""
}, {
    "club_name": "Strand",
    "website": ""
}, {
    "club_name": "Strømmen",
    "website": "http://www.strommensjakk.com/"
}, {
    "club_name": "Svartlamon",
    "website": "http://www.slsl.no/"
}, {
    "club_name": "Søråshøgda",
    "website": ""
}, {
    "club_name": "Tempo",
    "website": ""
}, {
    "club_name": "Tinn",
    "website": ""
}, {
    "club_name": "Tromsø",
    "website": "http://tromsosjakk.no/"
}, {
    "club_name": "Trondheim",
    "website": "http://www.tsf.no/"
}, {
    "club_name": "Tønsberg",
    "website": "http://www.123hjemmeside.no/tonsberg_sjakklubb/"
}, {
    "club_name": "Ullr",
    "website": ""
}, {
    "club_name": "Vadsø",
    "website": "http://www.vadsosjakk.no/"
}, {
    "club_name": "Vestvågøy",
    "website": ""
}, {
    "club_name": "Volda Ørsta",
    "website": ""
}, {
    "club_name": "Voss",
    "website": ""
}, {
    "club_name": "Våler",
    "website": ""
}, {
    "club_name": "Vålerenga",
    "website": ""
}, ]


if (Players.find().count() === 0) {
    players = _.values(getAllPlayers())[0];

    for (i = 0; i < players.length; i++) {
        Players.insert(players[i]);
    }
}

if (Clubs.find().count() === 0) {
    for (i = 0; i < chess_clubs.length; i++) {
        Clubs.insert(chess_clubs[i]);
    }
}
