Template.player.onRendered(function() {

    Session.set('img_url', '/images/mysteryman.png');

    delete Session.keys["filter_object"];

});

Template.player.helpers({

    loadImage: function(fide_id) {
        var img = new Image();
        img.addEventListener('load', function() { // addeventlistener is better than onload
            if (img.width !== 80) {
                Session.set('img_url', img.src);
            } else {
                Session.set('img_url', '/images/mysteryman.png');
            }
        });

        img.src = 'https://ratings.fide.com/card.php?code=' + fide_id;
    },

    lastElement: function(list) {
        return _.last(list);
    },

    isNegative: function() {
        return this.elo<this.nsf_elo;
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
    }
});
