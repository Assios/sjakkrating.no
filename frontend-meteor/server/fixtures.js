// Fetch players from API if not found in db
function getAllPlayers() {
	var url = "http://localhost:8888"

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

if (Players.find().count() === 0) {

	players = _.values(getAllPlayers())[0];

	for (i = 0; i < players.length; i++) {
		Players.insert(players[i]);
	}
}
