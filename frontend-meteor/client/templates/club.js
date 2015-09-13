Template.clubPage.helpers({
	club_players: function(c_name) {
		return Players.find({club: c_name}, {sort: {elo: -1}}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},
});
