Template.girlTop.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip();

    Session.set("currentNameFilter", "");

});

Template.girlTop.helpers({

    labelBasedOnRatingDifference: function(newRating, oldRating) {
        if (newRating < oldRating) {
            return "label label-danger";
        } else if (newRating > oldRating) {
            return "label label-success";
        } else {
            return "label label-default";
        }
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

    topJuniorGirls: function(l) {
        year = new Date().getFullYear();

        return Players.find({
            year_of_birth: {
                $gte: year - 20,
            },
            gender: "F",
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

    topKadettGirls: function(l) {
        year = new Date().getFullYear();

        return Players.find({
            year_of_birth: {
                $gte: year - 16,
            },
            gender: "F",
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

    topLilleputtGirls: function(l) {
        year = new Date().getFullYear();

        return Players.find({
            year_of_birth: {
                $gte: year - 13,
            },
            gender: "F",
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

    topMiniputtGirls: function(l) {
        year = new Date().getFullYear();

        return Players.find({
            year_of_birth: {
                $gte: year - 11
            },
            gender: "F",
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

    junior: function() {
        return new Date().getFullYear() - 20;
    },

    kadett: function() {
        return new Date().getFullYear() - 16;
    },

    lilleputt: function() {
        return new Date().getFullYear() - 13;
    },

    miniputt: function() {
        return new Date().getFullYear() - 11;
    },

    senior: function() {
        return new Date().getFullYear() - 60;
    },
});