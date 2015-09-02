Template.player.onRendered(function() {

	var nsf_id = Router.current().params['_id'];

    Meteor.call('getPlayer', nsf_id, function(err, response) {

        Session.set('playerInfo', response);
    });

});

Template.player.helpers({
	playerInfo: function() {
		return Session.get('playerInfo');
	}
});