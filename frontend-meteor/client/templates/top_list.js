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
	topElo: function() {
		return Players.find({}, {sort: {elo: -1}});
	},

	topGames: function(number) {
		return Players.find({}, {sort: {number_of_games: -1}});
	},

	topWomen: function() {
		return Players.find({ gender: "F" }, {sort: {elo: -1}});
	},

	stats: function() {
		return Session.get('stats');
	}
});
