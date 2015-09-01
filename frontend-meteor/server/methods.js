Meteor.methods({
	getTop: function() {
		var url = "http://localhost:8888/top";

		var result = Meteor.http.get(url, {timeout:30000});
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
