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
	                $gt: year - 20
	            },
	            country: "NOR"
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
  this.ready();
});
