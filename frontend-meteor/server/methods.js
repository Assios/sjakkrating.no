var URL_PREFIX = "http://localhost:8888"

Meteor.methods({
	getTop: function(argument, gender) {
		// argument could e.g. be elo or number_of_games
		var url = URL_PREFIX + "/top?arg=" + argument + "&gender=" + gender;

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

	getPlayer: function(nsf_id) {
		var url = URL_PREFIX + "/player/" + nsf_id;

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
