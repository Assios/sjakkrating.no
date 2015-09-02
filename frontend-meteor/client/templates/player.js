Template.player.onRendered(function() {

	var nsf_id = Router.current().params['_id'];

    Meteor.call('getPlayer', nsf_id, function(err, response) {

        Session.set('playerInfo', response);
    });

});

Template.player.helpers({
	playerInfo: function() {
		return Session.get('playerInfo');
	},

	getImage: function(fide_id) {
			var img = new Image();

			img.src = 'https://ratings.fide.com/card.php?code=' + fide_id;

			console.log(img.width);
			console.log(img.height);

			if (img.width!=0)
				return 'https://ratings.fide.com/card.php?code=' + fide_id;
			else
				return 'https://secure.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536';
		}
});