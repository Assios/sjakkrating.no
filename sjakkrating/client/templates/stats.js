Template.stats.onRendered(function() {

    delete Session.keys["filter_object"];

});

Template.stats.helpers({
    number_of_players: function() {
        return Players.find().count();
    },

    number_of_gms: function() {
        return Players.find({fide_title: "GM", "country": "NOR"}).count();
    },

    number_of_clubs: function() {
        return Clubs.find().count();
    },

    average_rating: function() {
        total = 0;

        Players.find().map(function(p) {
            total += p.elo;
        }); 

        return Math.round(total / Players.find().count());
    },

    average_age: function() {
        var year = new Date().getFullYear()
        total_age = 0;

        Players.find().map(function(p) {
            total_age += (year - p.year_of_birth);
        });

        return Math.round(total_age / Players.find().count());
    },

    youngest_player: function() {
        p = Players.findOne({}, {
            sort: {
                year_of_birth: -1
            }
        });
        return p;
    },

    oldest_player: function() {
        p = Players.findOne({}, {
            sort: {
                year_of_birth: 1
            }
        });
        return p;
    },

    genderRatio: function() {
        male = Players.find({
            gender: 'M'
        }).count();
        female = Players.find({
            gender: 'F'
        }).count();

        return {
            credits: false,
            chart: {
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ""
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Kjønn',
                data: [{
                    name: 'Menn',
                    y: male
                }, {
                    name: 'Kvinner',
                    y: female
                }]
            }]
        };
    },

    distributionChart: function() {

    var y_axis = [25, 
            22, 
            34, 
            41, 
            42, 
            42, 
            49, 
            69, 
            61, 
            52, 
            92, 
            83, 
            98, 
            88, 
            112, 
            112, 
            94, 
            113, 
            118, 
            91, 
            91, 
            104, 
            115, 
            64, 
            73, 
            66, 
            65, 
            55, 
            61, 
            52, 
            48, 
            44, 
            38, 
            41, 
            26, 
            17, 
            19, 
            11, 
            13, 
            7, 
            3, 
            6, 
            0, 
            2, 
            0, 
            0, 
            1, 
            0];

        var x_axis = [
        "500-550", 
        "550-600", 
        "600-650", 
        "650-700", 
        "700-750", 
        "750-800", 
        "800-850", 
        "850-900", 
        "900-950", 
        "950-1000", 
        "1000-1050", 
        "1050-1100", 
        "1100-1150", 
        "1150-1200", 
        "1200-1250", 
        "1250-1300", 
        "1300-1350", 
        "1350-1400", 
        "1400-1450", 
        "1450-1500", 
        "1500-1550", 
        "1550-1600", 
        "1600-1650", 
        "1650-1700", 
        "1700-1750", 
        "1750-1800", 
        "1800-1850", 
        "1850-1900", 
        "1900-1950", 
        "1950-2000", 
        "2000-2050", 
        "2050-2100", 
        "2100-2150", 
        "2150-2200", 
        "2200-2250", 
        "2250-2300", 
        "2300-2350", 
        "2350-2400", 
        "2400-2450", 
        "2450-2500", 
        "2500-2550", 
        "2550-2600", 
        "2600-2650", 
        "2650-2700", 
        "2700-2750", 
        "2750-2800", 
        "2800-2850", 
        "2850-2900"
    ];

        return {
            chart: {
                type: "areaspline"
            },
            title: {
                text: "Ratingfordeling",
                align: 'center',
                x: -20,
            },
            xAxis: {
                categories: x_axis,
            },
            yAxis: {
                title: {
                    text: 'Antall spillere'
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
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false
                    },
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Frekvens',
                data: y_axis,
            }],
            credits: false,
        };
    }
});
