Meteor.publish('players', function() {
 	return Players.find();
});

Meteor.publish('clubs', function() {
	return Clubs.find();
});