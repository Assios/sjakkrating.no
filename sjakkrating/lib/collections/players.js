Players = new Mongo.Collection('players');

Players.allow({
	update: function() {
		return Meteor.user().profile.admin;
	},
	remove: function() {
		return Meteor.user().profile.admin;
	}
});
