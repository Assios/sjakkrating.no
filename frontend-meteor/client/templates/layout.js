Template.layout.helpers({
	getDate: function() {
		return Session.get('dateObject').format_date;
	},
});
