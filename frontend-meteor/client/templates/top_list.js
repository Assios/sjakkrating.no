Template.topList.onRendered(function() {

	Meteor.call('getTop', function(err, response) {
		if(err) {
			console.log("An error occurred retrieving data", err );
		} else {
			console.log(_.values(response)[0]);
			Session.set("top_list", response);
		}
	});
});

Template.topList.helpers({
	getTop: function() {
		HTTP.get(Meteor.absoluteUrl("http://vg.no"), function(err,result) {
    		console.log(result.data);
		});
	}
});