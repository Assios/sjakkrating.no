Template.player.onRendered(function() {

    Session.set("l_username", false);

    Session.set('img_url', '/images/mysteryman.png');

    Session.set("currentNameFilter", this.data.surname + ", " + this.data.only_first_name);

    if (this.data.lichess_username) {
        Meteor.call('getLichess', this.data.lichess_username, function(err, response) {
            Session.set('lichess_response', response);
        });
    }

    $('[data-toggle="tooltip"]').tooltip();

});

Template.player.helpers({

    foreign: function() {
        if ((this.country.length == 3) && !(this.country == "NOR"))
            return true;
        return false;
    },

    playerCount: function() {
        return Counts.get("player-count");
    },

    rank: function() {
        return Counts.get("player-rank") + 1;
    },

    gameRank: function() {
        return Counts.get("game-rank") + 1;
    },

    playerNor: function() {
        return Counts.get("player-nor");
    },

    rankNor: function() {
        return Counts.get("player-rank-nor") + 1;
    },

    playerYearCount: function() {
        return Counts.get("player-year-count");
    },

    rankYear: function() {
        return Counts.get("player-year-rank") + 1;
    },

    has_fide_rating: function() {
        if (this.fide_standard || this.fide_rapid || this.fide_blitz) {
            return true;
        } else {
            return false;
        }
    },

    norwegian: function() {
        if (this.country == "NOR" || (this.country.length != 3))
            return true;
        else
            return false;
    },

    class: function() {
        val = ""
        year = new Date().getFullYear();

        if (this.GP_class == "M") {
            val += "Mester";
        } else {
            val += this.GP_class;
        }

        if (this.year_of_birth >= year - 11) {
            return val + " / Miniputt";
        } else if (this.year_of_birth >= year - 13) {
            return val + " / Lilleputt";
        } else if (this.year_of_birth >= year - 16) {
            return val + " / Kadett";
        } else if (this.year_of_birth >= year - 20) {
            return val + " / Junior";
        } else if (this.year_of_birth <= year - 60) {
            return val + " / Senior";
        } else {
            return val;
        }

    },

    lichess_image: function() {
        var offline_img = "http://lichess1.org/assets/images/favicon-32-white.png";
        var online_img = "http://rubenwardy.github.io/lichess_widgets/lichess_online.png";

        var r = Session.get("lichess_response");

        if (r.online) {
            return online_img;
        } else {
            return offline_img;
        }
    },

    lichessBlitz: function() {
        var r = Session.get("lichess_response");

        return r.perfs.blitz.rating;
    },

    lichessBullet: function() {
        var r = Session.get("lichess_response");

        return r.perfs.bullet.rating;
    },

    lichessClassical: function() {
        var r = Session.get("lichess_response");

        return r.perfs.classical.rating;
    },

    loadImage: function(fide_id) {
        var img = new Image();
        img.addEventListener('load', function() { // addeventlistener is better than onload
            if (img.width !== 80) {
                Session.set('img_url', img.src);
            } else {
                Session.set('img_url', '/images/mysteryman.png');
            }
        });

        img.src = 'http://chess-db.com/public/tmp/' + fide_id + '.jpg';
    },

    lastElement: function(list) {
        return _.last(list);
    },

    isNegative: function() {
        return this.elo < this.nsf_elo;
    },

    eloDifference: function() {
        var difference = this.elo - this.nsf_elo;
        var res;

        if (difference > 0)
            res = "(+" + difference + ")"
        else if (difference < 0)
            res = "(" + difference + ")"
        else
            res = "";

        return res;
    },

    gamesDifference: function() {
        var difference = this.number_of_games - this.games[this.games.length - 1];
        var res;

        if (difference > 0)
            res = "(+" + difference + ")"
        else
            res = "";

        return res;
    },

    ratingPerGame: function() {
        var g;
        var d;
        var games_difference;

        if (this.games.length == 0) {
            games_difference = this.number_of_games;
        } else {
            games_difference = this.number_of_games - this.games[this.games.length - 1];
        }

        var elo_difference = this.elo - this.nsf_elo;

        g = this.name;

        if (games_difference == 0)
            return g + " har ikke spilt noen partier siden siste offisielle rating kom.";

        if (elo_difference == 0)
            return g + " har hverken gått opp eller ned siden siste offisielle rating kom.";

        var rating_per_game = parseFloat(Math.round((elo_difference / games_difference) * 100) / 100).toFixed(2);

        if (rating_per_game > 0)
            d = "opp"
        else
            d = "ned"

        if (this.games.length > 0)
            return " " + g + " har gått " + d + " " + Math.abs(rating_per_game) + " i rating per parti siden siste offisielle rating kom.";
        else
            return "";
    },

    better_than: function() {
        var number_of_players = Players.find().count();

        var number = Players.find({}, {
            sort: {
                elo: -1
            }
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });

        for (var i = 0; i < number.length; i++) {
            if (number[i].nsf_id == this.nsf_id) {
                return Math.round(((number_of_players - number[i].place) / (number_of_players)) * 100);
            }
        }
    },

    getImage: function() {
        return Session.get('img_url');
    },

    merge_lists: function(first, second) {
        // Must be same length
        result = [];

        for (var i = 0; i < first.length; i++) {
            result.push([first[i], second[i]]);
        }

        return result;

    },

    title_mappings: function(title) {
        title_dict = {
            "GM": "Grandmaster",
            "IM": "International Master",
            "FM": "FIDE Master",
            "CM": "Candidate Master",
            "WGM": "Woman Grandmaster",
            "WIM": "Woman International Master",
            "WFM": "Woman FIDE Master",
            "WCM": "Woman Candidate Master",
        }

        return title_dict[title];
    },

    ratingChart: function() {

        dates = [];

        for (var i = 0; i < this.nsf_categories.length; i++) {
            dates.push(Date.UTC(this.nsf_categories[i][0], this.nsf_categories[i][1]));
        }

        var nsf_elos_peak = [],
            majorPeakVal = 70,
            len = this.nsf_elos.length,
            i,
            prevVal = this.nsf_elos[i],
            lab = '';

        for (i = 0; i < len; i++) {
            if (this.nsf_elos[i] - prevVal > majorPeakVal) {
                lab = '+' + (this.nsf_elos[i] - prevVal);
            } else if (prevVal - this.nsf_elos[i] > majorPeakVal) {
                lab = (this.nsf_elos[i] - prevVal);
            } else {
                lab = '';
            }
            nsf_elos_peak.push({
                y: this.nsf_elos[i],
                label: lab
            });
            prevVal = this.nsf_elos[i];
        }

        nsf_date_elos = [];

        for (var i = 0; i < dates.length; i++) {
            nsf_date_elos.push([dates[i], this.nsf_elos[i]])
        }

        fide_date_elos = [];

        for (var i = 0; i < dates.length; i++) {
            fide_date_elos.push([dates[i], this.fide_elos[i]])
        }

        blitz_date_elos = [];

        for (var i = 0; i < dates.length; i++) {
            blitz_date_elos.push([dates[i], this.blitz_elos[i]])
        }

        rapid_date_elos = [];

        for (var i = 0; i < dates.length; i++) {
            rapid_date_elos.push([dates[i], this.rapid_elos[i]])
        }

        games_date = [];

        for (var i = 0; i < dates.length; i++) {
            games_date.push([dates[i], this.games[i]])
        }

        var title_text;

        if (this.name.slice(-1) == 's')
            title_text = this.name + '\' ratingprogresjon';
        else
            title_text = this.name + 's ratingprogresjon';

        return {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: title_text,
                align: 'center',
                x: -20,
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Elo'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                shared: true,
            },
            legend: {
                align: 'top',
                verticalAlign: 'top',
                layout: 'horizontal',
                y: 10,
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Norsk elo (Offisiell)',
                data: nsf_date_elos
            }, {
                name: 'FIDE elo',
                data: fide_date_elos
            }, {
                name: 'Lyn',
                data: blitz_date_elos
            }, {
                name: 'Hurtig',
                data: rapid_date_elos
            }, {
                name: 'Antall partier',
                data: games_date
            }],
            credits: false,
        };
    },

    gameChartId: function() {
        return this._id + "gamechart";
    },

    gameChart: function() {
        if (Counts.get("player-games") < 1)
            return false;

        whiteGames = Counts.get("player-white");
        blackGames = Counts.get("player-black");
        whiteWin = Counts.get("player-win-white");
        whiteDraw = Counts.get("player-draw-white");
        whiteLose = Counts.get("player-lose-white");
        blackWin = Counts.get("player-win-black");
        blackDraw = Counts.get("player-draw-black");
        blackLose = Counts.get("player-lose-black");
        //var totalGames = Counts.get("player-games");

        return {

        chart: {
            type: 'pie'
        },
        title: {
            text: 'Spillstatistikk'
        },
        subtitle: {
            text: 'Trykk på en av fargene for å se resultater.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}'
                },
                animation: false
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },
        series: [{
            name: 'Partier',
            colorByPoint: true,
            data: [{
                name: 'Hvit',
                y: whiteGames,
                drilldown: 'Hvit'
            }, {
                name: 'Svart',
                y: blackGames,
                drilldown: 'Svart'
            }]
        }],
        drilldown: {
            series: [{
                name: 'Hvit',
                id: 'Hvit',
                data: [
                    ['Seire', whiteWin],
                    ['Remis', whiteDraw],
                    ['Tap', whiteLose],
                ]
            }, {
                name: 'Svart',
                id: 'Svart',
                data: [
                    ['Seire', blackWin],
                    ['Remis', blackDraw],
                    ['Tap', blackLose],
                ]
            }]
        },
        credits: false
    }
    },

    playedGames: function() {
        var n_games = Counts.get("player-games");

        if (n_games > 0) {
            return true;
        } else {
            return false;
        }
    },

    whiteGames: function() {
        return Counts.get("player-white");
    },

    blackGames: function() {
        return Counts.get("player-black");
    },

    whiteWin: function() {
        return Counts.get("player-win-white");
    },

    whiteDraw: function() {
        return Counts.get("player-draw-white");
    },

    whiteLose: function() {
        return Counts.get("player-lose-white");
    },

    blackWin: function() {
        return Counts.get("player-win-black");
    },

    blackDraw: function() {
        return Counts.get("player-draw-black");
    },

    blackLose: function() {
        return Counts.get("player-lose-black");
    },

    allowEdit: function() {
        if (this.protect) {
            return false;
        } else {
            return true;
        }
    },

    country_mapping: function(country_code) {
        country_dict = {
            "ABW": "Aruba",
            "AFG": "Afghanistan",
            "AGO": "Angola",
            "AIA": "Anguilla",
            "ALA": "Åland",
            "ALB": "Albania",
            "AND": "Andorra",
            "ARE": "De forente arabiske emirater",
            "ARG": "Argentina",
            "ARM": "Armenia",
            "ASM": "Amerikansk Samoa",
            "ATA": "Antarktis",
            "ATF": "De franske sørterritorier",
            "ATG": "Antigua og Barbuda",
            "AUS": "Australia",
            "AUT": "Østerrike",
            "AZE": "Aserbajdsjan",
            "BDI": "Burundi",
            "BEL": "Belgia",
            "BEN": "Benin",
            "BES": "Bonaire, Sint Eustatius og Saba",
            "BFA": "Burkina Faso",
            "BGD": "Bangladesh",
            "BGR": "Bulgaria",
            "BHR": "Bahrain",
            "BHS": "Bahamas",
            "BIH": "Bosnia-Hercegovina",
            "BLM": "Saint-Barthélemy",
            "BLR": "Hviterussland",
            "BLZ": "Belize",
            "BMU": "Bermuda",
            "BOL": "Bolivia",
            "BRA": "Brasil",
            "BRB": "Barbados",
            "BRN": "Brunei",
            "BTN": "Bhutan",
            "BVT": "Bouvetøya",
            "BWA": "Botswana",
            "CAF": "Den sentralafrikanske republikk",
            "CAN": "Canada",
            "CCK": "Kokosøyene",
            "CHE": "Sveits",
            "CHL": "Chile",
            "CHN": "Kina",
            "CIV": "Elfenbenskysten",
            "CMR": "Kamerun",
            "COD": "Den demokratiske republikken Kongo",
            "COG": "Republikken Kongo",
            "COK": "Cookøyene",
            "COL": "Colombia",
            "COM": "Komorene",
            "CPV": "Kapp Verde",
            "CRI": "Costa Rica",
            "CUB": "Cuba",
            "CUW": "Curaçao",
            "CXR": "Christmasøya",
            "CYM": "Caymanøyene",
            "CYP": "Kypros",
            "CZE": "Tsjekkia",
            "DEU": "Tyskland",
            "DJI": "Djibouti",
            "DMA": "Dominica",
            "DNK": "Danmark",
            "DOM": "Den dominikanske republikk",
            "DZA": "Algerie",
            "ECU": "Ecuador",
            "EGY": "Egypt",
            "ERI": "Eritrea",
            "ESH": "Vest-Sahara",
            "ESP": "Spania",
            "EST": "Estland",
            "ETH": "Etiopia",
            "FIN": "Finland",
            "FJI": "Fiji",
            "FLK": "Falklandsøyene",
            "FRA": "Frankrike",
            "FRO": "Færøyene",
            "FSM": "Mikronesiaføderasjonen",
            "GAB": "Gabon",
            "GBR": "Storbritannia",
            "GEO": "Georgia",
            "GHA": "Ghana",
            "GIB": "Gibraltar",
            "GIN": "Guinea",
            "GLP": "Guadeloupe",
            "GMB": "Gambia",
            "GNB": "Guinea-Bissau",
            "GNQ": "Ekvatorial-Guinea",
            "GRC": "Hellas",
            "GRD": "Grenada",
            "GRL": "Grønland",
            "GTM": "Guatemala",
            "GUF": "Fransk Guyana",
            "GUM": "Guam",
            "GUY": "Guyana",
            "HKG": "Hongkong",
            "HMD": "Heard- og McDonaldøyene",
            "HND": "Honduras",
            "HRV": "Kroatia",
            "HTI": "Haiti",
            "HUN": "Ungarn",
            "IDN": "Indonesia",
            "IMN": "Man",
            "IND": "India",
            "IOT": "Det britiske territoriet i Indiahavet",
            "IRL": "Irland",
            "IRN": "Iran",
            "IRQ": "Irak",
            "ISL": "Island",
            "ISR": "Israel",
            "ITA": "Italia",
            "JAM": "Jamaica",
            "JEY": "Jersey",
            "JPN": "Japan",
            "JOR": "Jordan",
            "KAZ": "Kasakhstan",
            "KEN": "Kenya",
            "KGZ": "Kirgisistan",
            "KHM": "Kambodsja",
            "KIR": "Kiribati",
            "KNA": "Saint Kitts og Nevis",
            "KOR": "Sør-Korea",
            "KWT": "Kuwait",
            "LAO": "Laos",
            "LBN": "Libanon",
            "LBR": "Liberia",
            "LBY": "Libya",
            "LCA": "Saint Lucia",
            "LIE": "Liechtenstein",
            "LKA": "Sri Lanka",
            "LSO": "Lesotho",
            "LTU": "Litauen",
            "LUX": "Luxembourg",
            "LVA": "Latvia",
            "MAC": "Macao",
            "MAF": "Saint-Martin",
            "MAR": "Marokko",
            "MCO": "Monaco",
            "MDA": "Moldova",
            "MDG": "Madagaskar",
            "MDV": "Maldivene",
            "MEX": "Mexico",
            "MHL": "Marshalløyene",
            "MKD": "Makedonia",
            "MLI": "Mali",
            "MLT": "Malta",
            "MMR": "Myanmar",
            "MNE": "Montenegro",
            "MNG": "Mongolia",
            "MNP": "Nord-Marianene",
            "MOZ": "Mosambik",
            "MRT": "Mauritania",
            "MSR": "Montserrat",
            "MTQ": "Martinique",
            "MUS": "Mauritius",
            "MWI": "Malawi",
            "MYS": "Malaysia",
            "MYT": "Mayotte",
            "NAM": "Namibia",
            "NCL": "Ny-Caledonia",
            "NER": "Niger",
            "NFK": "Norfolkøya",
            "NGA": "Nigeria",
            "NIC": "Nicaragua",
            "NIU": "Niue",
            "NLD": "Nederland",
            "NOR": "Norge",
            "NPL": "Nepal",
            "NRU": "Nauru",
            "NZL": "Ny-Zealand",
            "OMN": "Oman",
            "PAK": "Pakistan",
            "PAN": "Panama",
            "PCN": "Pitcairnøyene",
            "PER": "Peru",
            "PHL": "Filippinene",
            "PLW": "Palau",
            "PNG": "Papua Ny-Guinea",
            "POL": "Polen",
            "PRI": "Puerto Rico",
            "PRK": "Nord-Korea",
            "PRT": "Portugal",
            "PRY": "Paraguay",
            "PSE": "De palestinske territoriene",
            "PYF": "Fransk Polynesia",
            "QAT": "Qatar",
            "REU": "Réunion",
            "ROU": "Romania",
            "RUS": "Russland",
            "RWA": "Rwanda",
            "SAU": "Saudi-Arabia",
            "SDN": "Sudan",
            "SEN": "Senegal",
            "SGP": "Singapore",
            "SGS": "Sør-Georgia og Sør-Sandwichøyene",
            "SHN": "St. Helena, Ascension og Tristan da Cunha",
            "SJM": "Svalbard og Jan Mayen",
            "SLB": "Salomonøyene",
            "SLE": "Sierra Leone",
            "SLV": "El Salvador",
            "SMR": "San Marino",
            "SOM": "Somalia",
            "SPM": "Saint-Pierre og Miquelon",
            "SRB": "Serbia",
            "SSD": "Sør-Sudan",
            "STP": "São Tomé og Príncipe",
            "SUR": "Surinam",
            "SVK": "Slovakia",
            "SVN": "Slovenia",
            "SWE": "Sverige",
            "SWZ": "Swaziland",
            "SXM": "Sint Maarten",
            "SYC": "Seychellene",
            "SYR": "Syria",
            "TCA": "Turks- og Caicosøyene",
            "TCD": "Tsjad",
            "TGO": "Togo",
            "THA": "Thailand",
            "TJK": "Tadsjikistan",
            "TKL": "Tokelau",
            "TKM": "Turkmenistan",
            "TLS": "Øst-Timor",
            "TON": "Tonga",
            "TTO": "Trinidad og Tobago",
            "TUN": "Tunisia",
            "TUR": "Tyrkia",
            "TUV": "Tuvalu",
            "TWN": "Taiwan",
            "TZA": "Tanzania",
            "UGA": "Uganda",
            "UKR": "Ukraina",
            "UMI": "USAs ytre småøyer",
            "URY": "Uruguay",
            "USA": "USA",
            "UZB": "Usbekistan",
            "VAT": "Vatikanstaten",
            "VCT": "Saint Vincent og Grenadinene",
            "VEN": "Venezuela",
            "VGB": "De britiske Jomfruøyer",
            "VIR": "De amerikanske Jomfruøyer",
            "VNM": "Vietnam",
            "VUT": "Vanuatu",
            "WLF": "Wallis- og Futunaøyene",
            "WSM": "Samoa",
            "YEM": "Jemen",
            "ZAF": "Sør-Afrika",
            "ZMB": "Zambia",
            "ZWE": "Zimbabwe",
        }

        return country_dict[country_code];
    },

});

Template.player.events({
   "keyup .lichess-username-input": function (e) {
        e.preventDefault();

        var username = $("#lichess_username").val();

        if (username.length<2) {
            return;
        }

        Meteor.call('getLichess', username, function(err, response) {
            if (response) {
                Session.set("l_username", response);
            } else {
                Session.set("l_username", false);
            }
        });
   },


  'click .submit-lichess': function(e) {
    var response = Session.get("l_username");

    if (response.id) {
        Players.update(this._id, {$set: {lichess_username: response.username}}, function(error) {
          if (error) {
            alert(error.reason);
          } else {
            alert("La til Lichess-bruker!");
          } 
        });
    }
    else {
        alert("Fant ikke bruker på Lichess");
    }
  }
});
