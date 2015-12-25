Players = new Mongo.Collection('players');

Players.allow({
	update: function() {
		return true;
	},
	remove: function() {
		return Meteor.user().profile.admin;
	}
});

Players.deny({
  update: function(fieldNames) {
    return (_.without(fieldNames, 'lichess_username').length > 0);
  }
});
