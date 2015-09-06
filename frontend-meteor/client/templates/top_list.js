Template.topList.onRendered(function() {

	Meteor.call('getTop', 'elo', 'MF', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];

			for(var i = 0; i<list.length; i++) {
				list[i].place = i+1;
			}
			
			Session.set('topElo', list);
		}
	});

	Meteor.call('getTop', 'number_of_games', 'MF', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];

			for(var i = 0; i<list.length; i++) {
				list[i].place = i+1;
			}

			Session.set('topGames', list);
		}
	});

	Meteor.call('getTop', 'elo', 'F', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];

			for(var i = 0; i<list.length; i++) {
				list[i].place = i+1;
			}

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
	topElo: function(number) {
		return Session.get('topElo').slice(0, number);
	},

	topGames: function(number) {
		return Session.get('topGames').slice(0, number);
	},

	topWomen: function() {
		return Session.get('femaleTopElo');
	},

	stats: function() {
		return Session.get('stats');
	}
});
