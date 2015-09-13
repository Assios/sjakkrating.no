Template.topList.onRendered(function() {

	Meteor.call('getStats', 'stats', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			Session.set('stats', response);
		}
	});
});

Template.topList.helpers({
	topElo: function(l) {
		return Players.find({}, {sort: {elo: -1}, limit: l}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},

	topGames: function(l) {
		return Players.find({}, {sort: {number_of_games: -1}, limit: l}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},

	topWomen: function(l) {
		return Players.find({ gender: "F" }, {sort: {elo: -1}, limit: l}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},

	distinctClubs: function() {
		var distinctEntries = _.uniq(Players.find({}, {
		    sort: {club: 1}, fields: {club: true}
		}).fetch().map(function(x) {
		    return x.club;
		}), true);

		return distinctEntries;
	},

	listClubs: function() {
		return Clubs.find({});
	}
});
