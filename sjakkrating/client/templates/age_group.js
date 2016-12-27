Template.ageGroup.onRendered(function() {

    Session.set("currentNameFilter", "");
    $('[data-toggle="tooltip"]').tooltip()

});

Template.ageGroup.helpers({

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
        };

        return title_dict[title];
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

    heading_title: function() {
        const g = Router.current().params.query.gender;

        if (g === 'f') {
            return 'J';
        } else if (g === 'm') {
            return 'G';
        } else {
            return 'U';
        }
    },

    from_year: function(from) {
        const year = new Date().getFullYear();
        return year - from;
    },

    to_year: function(to) {
        const year = new Date().getFullYear();
        return year - to;
    },

    from_to_age: function(from_age, to_age, l) {
        const year = new Date().getFullYear();

        let query;
        const gender = Router.current().params.query.gender;

        if (gender === 'f') {
            query = [ { gender: 'F' } ];
        } else if (gender === 'm') {
            query = [ { gender: 'M' } ]
        } else {
            query = [ { gender: 'M' }, { gender: 'F' } ];
        }

        return Players.find({
            $or: query,
            year_of_birth: {
                $gte: year - from_age,
                $lte: year - to_age
            },
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

});
