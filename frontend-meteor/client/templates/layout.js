Template.layout.helpers({
	getDate: function() {
		return Session.get('dateObject').format_date;
	},
});

Template.layout.events({
  "autocompleteselect input": function(event, template, doc) {
    document.getElementById('auto-input').value = '';
    Router.go('player', {_id: doc.nsf_id});
  }
});
