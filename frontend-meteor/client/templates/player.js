Template.player.onRendered(function() {

	Session.set('img_url', '/images/mysteryman.png');

});

Template.player.helpers({

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
