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

Meteor.publish('player-game-stats', function(player) {
  Counts.publish(this, 'player-games', Games.find({$or: [ {WhiteSurname: player.surname, WhiteFirstName: player.only_first_name}, {BlackSurname: player.surname, BlackFirstName: player.only_first_name}]}));
  Counts.publish(this, 'player-white', Games.find({WhiteSurname: player.surname, WhiteFirstName: player.only_first_name}));
  Counts.publish(this, 'player-black', Games.find({BlackSurname: player.surname, BlackFirstName: player.only_first_name}));
  Counts.publish(this, 'player-win-white', Games.find({WhiteSurname: player.surname, WhiteFirstName: player.only_first_name, Result: "1-0"}));
  Counts.publish(this, 'player-draw-white', Games.find({WhiteSurname: player.surname, WhiteFirstName: player.only_first_name, Result: "1/2-1/2"}));
  Counts.publish(this, 'player-lose-white', Games.find({WhiteSurname: player.surname, WhiteFirstName: player.only_first_name, Result: "0-1"}));
  Counts.publish(this, 'player-win-black', Games.find({BlackSurname: player.surname, BlackFirstName: player.only_first_name, Result: "0-1"}));
  Counts.publish(this, 'player-draw-black', Games.find({BlackSurname: player.surname, BlackFirstName: player.only_first_name, Result: "1/2-1/2"}));
  Counts.publish(this, 'player-lose-black', Games.find({BlackSurname: player.surname, BlackFirstName: player.only_first_name, Result: "1-0"}));
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
