Template.topList.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip(); 

});

Template.topList.helpers({
    junior: function() {
        return new Date().getFullYear() - 20;
    },

    topElo: function(l) {
        return Players.find({country: "NOR"}, {
            sort: {
                elo: -1
            },
            limit: l
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

    topGames: function(l) {
        return Players.find({country: "NOR"}, {
            sort: {
                number_of_games: -1
            },
            limit: l
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
    },

    topWomen: function(l) {
        return Players.find({
            gender: "F",
            country: "NOR"
        }, {
            sort: {
                elo: -1
            },
            limit: l
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
    },

    topJuniors: function(l) {
        year = new Date().getFullYear();

        return Players.find({
            year_of_birth: {
                $gte: year - 20
            },
            country: "NOR"
        }, {
            sort: {
                elo: -1
            },
            limit: l
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
    },

    distinctClubs: function() {
        var distinctEntries = _.uniq(Players.find({}, {
            sort: {
                club: 1
            },
            fields: {
                club: true
            }
        }).fetch().map(function(x) {
            return x.club;
        }), true);

        return distinctEntries;
    },

    listClubs: function() {
        return Clubs.find({}, {
            sort: {
                name: 1
            }
        });
    }
});
