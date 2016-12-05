Template.clubPage.helpers({
    club_players: function() {
        return Players.find({
            club: this.name
        }, {
            sort: {
                elo: -1
            }
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
    },

    labelBasedOnRatingDifference: function(newRating, oldRating) {
        if (newRating < oldRating) {
            return "label label-danger";
        }
        else if (newRating > oldRating) {
            return "label label-success";
        }
        else {
            return "label label-default";
        }
    },

    number_of_players: function() {
        return Players.find({
            club: this.name
        }).count();
    },

    average_rating: function() {
        let total = 0;

        Players.find({
            club: this.name
        }).map(function(p) {
            total += p.elo;
        });

        return Math.round(total / Players.find({
            club: this.name
        }).count());
    },

    average_age: function() {
        const year = new Date().getFullYear()
        let total_age = 0;

        Players.find({
            club: this.name
        }).map(function(p) {
            total_age += (year - p.year_of_birth);
        });

        return Math.round(total_age / Players.find({
            club: this.name
        }).count());
    },

    genderRatio: function() {
        const male = Players.find({
            club: this.name,
            gender: 'M'
        }).count();
        const female = Players.find({
            club: this.name,
            gender: 'F'
        }).count();

        return {
            credits: false,
            chart: {
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: null
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
    }
});
