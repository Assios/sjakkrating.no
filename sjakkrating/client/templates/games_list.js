Template.gamesList.helpers({
	games: function() {
		return Games.find();
	}
});
