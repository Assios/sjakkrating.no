Template.gamesList.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip(); 

});


Template.gamesList.helpers({
	games: function() {
		return Games.find();
	}
});
