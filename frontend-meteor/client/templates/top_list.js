Template.topList.onRendered(function() {

	Meteor.call('getTop', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			list = _.values(response)[0];
			console.log(list);
			Session.set('topList', list);
		}
	});
});

Template.topList.helpers({
	top: function() {
		return Session.get('topList');
	}
});
