var URL_PREFIX = "http://assios.no:8888"

Meteor.methods({

	getDate: function() {
		var url = URL_PREFIX + "/date";

		var result = Meteor.http.get(url, {timeout:3000});
			if(result.statusCode==200) {
				var response = JSON.parse(result.content);
				console.log("response received.");
				return response;
			} else {
				console.log("Response issue: ", result.statusCode);
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}
	},

	getDistribution: function() {
		var url = URL_PREFIX + "/distribution";

		var result = Meteor.http.get(url, {timeout:3000});
			if(result.statusCode==200) {
				var response = JSON.parse(result.content);
				console.log("response received.");
				return response;
			} else {
				console.log("Response issue: ", result.statusCode);
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}		
	}
});
