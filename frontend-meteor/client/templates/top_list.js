Template.topList.onRendered(function() {

	Meteor.call('getTop', 'elo', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			Session.set('topElo', list);
		}
	});

	Meteor.call('getTop', 'number_of_games', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			Session.set('topGames', list);
		}
	});
});

Template.topList.helpers({
	topElo: function() {
		return Session.get('topElo');
	},

	topGames: function() {
		return Session.get('topGames');
	}

});
