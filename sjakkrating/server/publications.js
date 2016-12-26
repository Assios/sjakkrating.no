Meteor.publish('players', function() {
    return Players.find();
});

Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('game', function(_idg) {
    return Games.find({ _id: new Meteor.Collection.ObjectID(_idg)});
});

Meteor.publish('player', function(_id) {
    return Players.find({nsf_id: parseInt(_id)});
});

Meteor.publish('clubPlayers', function(c_name) {
    return Players.find({
        club: c_name
    });
});

Meteor.publish('lichessPlayers', function() {
    return Players.find({lichess_username: { $exists: true, $ne: "" }});
});

Meteor.publish('trophyPlayers', function() {
    return Players.find({trophy: { $exists: true, $ne: "" }});
});

Meteor.publish('advancedSearch', function(attributes) {
    return Players.find(attributes);
});

Meteor.publish('youngestPlayer', function() {
    return Players.find({}, {sort: {year_of_birth: -1}, limit: 1});
});

Meteor.publish('oldestPlayer', function() {
    return Players.find({}, {sort: {year_of_birth: 1}, limit: 1});
});

ReactiveTable.publish("tableplayers", Players);

ReactiveTable.publish("tableGames", Games);

Meteor.publish('topPlayers', function() {
    return Players.find({country: "NOR"}, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish('topDiff', function() {
    return Players.find({nsf_elo: {$gte: 1}}, {
        sort: {
            diff: -1
        },
        limit: 100
    });
});

Meteor.publish('topGameDiff', function() {
    return Players.find({gamesDiff: {$gte: 10}}, {
        sort: {
            gamesDiff: -1
        },
        limit: 100
    });
});

Meteor.publish("topJuniors", function() {
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
        limit: 100
    });
});

Meteor.publish("topJuniorGirls", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $gte: year - 20
        },
        country: "NOR",
        gender: "F",
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish("topU", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $gt: year - 18,
            $lt: year - 11
        },
    }, {
        sort: {
            elo: -1
        },
    });
});

Meteor.publish("topKadetts", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $gte: year - 16,
        },
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish("topKadettGirls", function() {
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
        limit: 100
    });
});


Meteor.publish("topLilleputts", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $gte: year - 13,
        },
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish("topLilleputtGirls", function() {
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
        limit: 100
    });
});

Meteor.publish("topMiniputts", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $gte: year - 11
        },
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish("topMiniputtGirls", function() {
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
        limit: 100
    });
});

Meteor.publish("topSeniors", function() {
    year = new Date().getFullYear();

    return Players.find({
        year_of_birth: {
            $lte: year - 60
        },
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish("topWomen", function() {
    return Players.find({
        gender: "F",
        $or: [ {country: null}, {country: "NOR"} ],
    }, {
        sort: {
            elo: -1
        },
        limit: 100
    });
});

Meteor.publish('playerGames', function(player) {
    return Games.find({
        $or: [ {WhiteSurname: player.surname, WhiteFirstName: player.only_first_name}, {BlackSurname: player.surname, BlackFirstName: player.only_first_name} ]
    });
});

Meteor.publish('clubs', function() {
    return Clubs.find();
});

Meteor.publish("autocompletePlayers", function(selector, options) {
    Autocomplete.publishCursor(Players.find(selector, options), this);
    Autocomplete.publishCursor(Clubs.find(selector, options), this);
    this.ready();
});

Meteor.publish('playerStats', function(player) {
    Counts.publish(this, 'player-count', Players.find());
    Counts.publish(this, 'player-rank', Players.find({elo: { $gt: player.elo }}));
    Counts.publish(this, 'game-rank', Players.find({number_of_games: { $gt: player.number_of_games }}));
    Counts.publish(this, 'player-rank-nor', Players.find({$or: [ {country: "NOR"}, {country: null} ], elo: { $gt: player.elo }}));
    Counts.publish(this, 'player-nor', Players.find({ $or: [ {country: "NOR"}, {country: null} ]}));
    Counts.publish(this, 'player-year-rank', Players.find({year_of_birth: player.year_of_birth, elo: { $gt: player.elo }}));
    Counts.publish(this, 'player-year-count', Players.find({year_of_birth: player.year_of_birth}));
});

Meteor.publish('stats', function() {
    Counts.publish(this, 'player-count', Players.find());
    Counts.publish(this, 'age-count', Players.find(), { countFromField: 'year_of_birth' });
    Counts.publish(this, 'rating-count', Players.find(), { countFromField: 'elo' });
    Counts.publish(this, 'male-count', Players.find({gender: 'M'}));
    Counts.publish(this, 'female-count', Players.find({gender: 'F'}));
    Counts.publish(this, 'gm-count', Players.find({fide_title: "GM", "country": "NOR"}));
    Counts.publish(this, 'im-count', Players.find({fide_title: "IM", "country": "NOR"}));
    Counts.publish(this, 'fm-count', Players.find({fide_title: "FM", "country": "NOR"}));
    Counts.publish(this, 'cm-count', Players.find({fide_title: "CM", "country": "NOR"}));
    Counts.publish(this, 'wgm-count', Players.find({fide_title: "WGM", "country": "NOR"}));
    Counts.publish(this, 'wim-count', Players.find({fide_title: "WIM", "country": "NOR"}));
    Counts.publish(this, 'wfm-count', Players.find({fide_title: "WFM", "country": "NOR"}));
});