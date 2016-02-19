Template.lichessList.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip();

});

Template.lichessList.helpers({
    lichessUsers: function() {
        return Players.find({
            lichess_username: { $exists: true, $ne: "" }
        }, {
            sort: {
                elo: -1
            },
        }).map(function(player, index) {
            player.place = index + 1;
            return player;
        });
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
});
