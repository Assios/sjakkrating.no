Template.topList.onRendered(function() {

	Meteor.call('getTop', 'elo', 'MF', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			Session.set('topElo', list);
		}
	});

	Meteor.call('getTop', 'number_of_games', 'MF', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			Session.set('topGames', list);
		}
	});

	Meteor.call('getTop', 'elo', 'F', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			Session.set('femaleTopElo', list);
		}
	});

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
		return Session.get('topElo');
	},

	topGames: function() {
		return Session.get('topGames');
	},

	topWomen: function() {
		return Session.get('femaleTopElo');
	},

	stats: function() {
		return Session.get('stats');
	}
});
