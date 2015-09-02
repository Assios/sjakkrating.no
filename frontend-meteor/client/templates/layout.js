Template.layout.onRendered(function() {

	Meteor.call('getDate', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			Session.set('dateObject', response);
		}
	});
});

Template.layout.helpers({
	getDate: function() {
		return Session.get('dateObject').format_date;
	},
});
