Clubs = new Mongo.Collection('clubs');

Clubs.allow({
	update: function() {
		return Meteor.user().profile.admin;
	},
	remove: function() {
		return Meteor.user().profile.admin;
	}
});
