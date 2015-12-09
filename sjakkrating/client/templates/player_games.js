Template.playerGames.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip(); 
	Meteor.subscribe('playerGames', this.data);

});

Template.playerGames.helpers({
	games: function() {
		return Games.find();
	}
});

Template.playerGames.events({
    'click .back-profile': function(){
        Router.go('player', {_id: this.nsf_id});
    },

});
