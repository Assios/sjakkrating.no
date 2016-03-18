Template.ratingGain.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip();

});

Template.ratingGain.helpers({
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

    bestDiff: function(l) {
        return Players.find({
            nsf_elo: {
                $gte: 1,
            },
        }, {
            sort: {
                diff: -1
            },
            limit: l
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
    },

    bestGameDiff: function(l) {
        return Players.find({
        }, {
            sort: {
                gamesDiff: -1
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
        } else if (newRating > oldRating) {
            return "label label-success";
        } else {
            return "label label-default";
        }
    },
});