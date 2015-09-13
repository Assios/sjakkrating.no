Template.clubPage.helpers({
	club_players: function(c_name) {
		return Players.find({club: c_name}, {sort: {elo: -1}}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},

	number_of_players: function(c_name) {
		return Players.find({club: c_name}).count();
	},

	average_rating: function(c_name) {
		total = 0

		Players.find({club: c_name}).map(function(p) {
		  total += p.elo;
		});

		return Math.round(total/Players.find({club: c_name}).count());
	},

	gender_ratio: function(c_name) {
		male = Players.find({club: c_name, gender: 'M'}).count();
		female = Players.find({club: c_name, gender: 'F'}).count();

		return (female/male*100).toFixed(2);
	}
});
