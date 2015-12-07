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

games = [{
    "event": "No Logo Norway Chess",
    "site": "Stavanger",
    "date": "2014.06.13",
    "round": "9",
    "white": "Carlsen, Magnus Øen",
    "black": "Agdestein, Simen",
    "result": "1-0",
    "white_elo": "2881",
    "black_elo": "2628",
    "eco": "E15",
    "moves": ['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'g3', 'Ba6', 'b3', 'd5', 'Bg2', 'Bb4', 'Bd2', 'Bd6', 'Nc3', 'O-O', 'O-O', 'dxc4', 'Ne5', 'c6', 'bxc4', 'Qc7', 'Bf4', 'Bb7', 'Rc1', 'Nh5', 'Ne4', 'Nxf4', 'gxf4', 'c5', 'Qd3', 'Bxe5', 'Ng5', 'g6', 'Qh3', 'h5', 'dxe5', 'Nc6', 'Ne4', 'Nd4', 'Nf6', 'Kg7', 'Rfe1', 'Nf5', 'Rc3', 'Rh8', 'Rd1', 'Rad8', 'Rcd3', 'Rd4', 'e3', 'Rxd3', 'Rxd3', 'Bxg2', 'Qxg2', 'Rd8', 'Kf1', 'Kf8', 'Rxd8', 'Qxd8', 'Ke2', 'Qc8', 'a3', 'Ke7', 'h3', 'Kd8', 'Qe4', 'Kc7', 'Nh7', 'Qe8', 'Ng5', 'b5', 'Qd3', 'a6', 'Kd2', 'Kb6', 'Kc3', 'Qe7', 'Ne4', 'Qc7', 'Kb3', 'Kc6', 'Nc3', 'bxc4', 'Qxc4', 'Qb6', 'Kc2', 'Qa5', 'Qe4', 'Kc7', 'Qa8', 'c4', 'Qf8', 'Kd7', 'Ne4', 'Qa4', 'Kc1', 'Qc6', 'Qxf7', 'Kc8', 'Nd6', 'Kd8', 'Qf8', 'Kc7', 'Qc8', 'Kb6', 'Qb8']
}, {
    "event": "Entercard Scandinavian Masters",
    "site": "Oslo",
    "date": "2015.05.09",
    "round": "2",
    "white": "Tari, Aryan",
    "black": "Agdestein, Simen",
    "results": "1/2-1/2",
    "white_elo": "2520",
    "black_elo": "2620",
    "ECO": "B04",
    "moves": ['e4', 'Nf6', 'e5', 'Nd5', 'd4', 'd6', 'Nf3', 'c6', 'c4', 'Nc7', 'h3', 'dxe5', 'Nxe5', 'g6', 'Nc3', 'Bg7', 'Nf3', 'O-O', 'Be3', 'b5', 'Qd2', 'Ba6', 'Bh6', 'bxc4', 'Bxg7', 'Kxg7', 'Ne5', 'Nb5', 'Rd1', 'Nd6', 'Be2', 'f6', 'Ng4', 'Nd7', 'O-O', 'Rb8', 'Rfe1', 'c5', 'dxc5', 'Nxc5', 'Qe3', 'Rc8', 'Nd5', 'e5', 'b4', 'cxb3', 'Bxa6', 'Nxa6', 'Qxa7', 'Nc7', 'Nb6', 'Rb8', 'Nc4', 'Nb5', 'Qc5', 'Ne6', 'Qe3', 'Nbd4', 'Ncxe5', 'Qc7', 'Rc1', 'Qb7', 'axb3', 'Nf5', 'Qc3', 'Rbc8', 'Qf3', 'Qxf3', 'Nxf3', 'Nf4', 'Rxc8', 'Rxc8', 'g3', 'Nxh3', 'Kg2', 'Ng5', 'Nxg5', 'fxg5', 'Ne3', 'Nxe3', 'Rxe3', 'Rb8']
}]

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
    "website": ""
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
    "website": "http://www.modumsjakken.net/"
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
    "website": ""
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
    "website": ""
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
        Players.update({nsf_id: temp_id}, { $set: { elo: players[i].elo }});
    }
}

// fide_standard: players[i].fide_standard, fide_rapid: players[i].fide_rapid, fide_blitz: players[i].fide_blitz }

if (Clubs.find().count() === 0) {
    for (i = 0; i < chess_clubs.length; i++) {
        Clubs.insert(chess_clubs[i]);
    }
}

if (Games.find().count() === 0) {
    for (i = 0; i < games.length; i++) {
        Games.insert(games[i]);
    }
}