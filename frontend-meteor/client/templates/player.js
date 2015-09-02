Template.player.onRendered(function() {

	Session.set('img_url', '/images/mysteryman.png');

	var nsf_id = Router.current().params['_id'];

    Meteor.call('getPlayer', nsf_id, function(err, response) {
        Session.set('playerInfo', response);
    });

});

Template.player.helpers({
	playerInfo: function() {
		return Session.get('playerInfo');
	},

	loadImage: function(fide_id) {
	  var img = new Image();
	  img.addEventListener('load', function() { // addeventlistener is better than onload
	    if (img.width !== 80) {
	      Session.set('img_url', img.src);
	    } else {
	      Session.set('img_url', '/images/mysteryman.png');
	    }
	  });
	  
	  img.src = 'https://ratings.fide.com/card.php?code=' + fide_id;
	},

	getImage: function() {
		return Session.get('img_url');
	}
});
