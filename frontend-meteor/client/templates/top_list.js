Template.topList.helpers({
	getTop: function() {
		HTTP.get(Meteor.absoluteUrl("http://vg.no"), function(err,result) {
    		console.log(result.data);
		});
	}
});