Meteor.publish('players', function() {
 	return Players.find();
});

Meteor.publish('player', function(_id) {
  return Players.find({nsf_id: parseInt(_id)});
});

Meteor.publish('clubPlayers', function(c_name) {
    return Players.find({
        club: c_name
    });
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
        country: "NOR"
    }, {
        sort: {
            elo: -1
        },
        limit: 50
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
