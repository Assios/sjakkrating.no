Template.playerGames.onRendered(function() {

    $('[data-toggle="tooltip"]').tooltip(); 
	Meteor.subscribe('playerGames', this.data);

});

Template.playerGames.helpers({
	games: function() {
		  return Games.find({
		    $or: [ {WhiteSurname: this.surname}, {BlackSurname: this.surname} ]
		  });
	},

    settings: function () {
        return {
            collection: Games,
            rowsPerPage: 100,
            fields: [
            	{key: 'Round', label: '', tmpl: Template.gameTmpl},
            	{key: 'Event', label: 'Turnering'},
            	{key: 'White', label: 'Hvit'},
            	{key: 'Black', label: 'Svart', sortDirection: 'descending'},
				{key: 'Result', label: 'Resultat', sortOrder: 1, sortDirection: 'descending'},       	
            	{key: 'Date', label: 'Dato', sortOrder: 0, sortDirection: 'descending'},
            ],
        };
    }
});

Template.playerGames.events({
    'click .back-profile': function(){
        Router.go('player', {_id: this.nsf_id});
    },

});
