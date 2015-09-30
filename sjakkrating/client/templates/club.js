Template.clubPage.onRendered(function() {

  delete Session.keys["filter_object"];

});


Template.clubPage.helpers({
	club_players: function() {
		return Players.find({club: this.club_name}, {sort: {elo: -1}}).map(function(player, index) {
			player.place = index+1;
			return player;
		});
	},

	number_of_players: function() {
		return Players.find({club: this.club_name}).count();
	},

	average_rating: function() {
		total = 0;

		Players.find({club: this.club_name}).map(function(p) {
		  total += p.elo;
		});

		return Math.round(total/Players.find({club: this.club_name}).count());
	},

	average_age: function() {
		var year = new Date().getFullYear()
		total_age = 0;

		Players.find({club: this.club_name}).map(function(p) {
		  total_age += (year-p.year_of_birth);
		});

		return Math.round(total_age/Players.find({club: this.club_name}).count());		
	},

	genderRatio: function() {
			male = Players.find({club: this.club_name, gender: 'M'}).count();
			female = Players.find({club: this.club_name, gender: 'F'}).count();

	    return {
	    		credits: false,
	        chart: {
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	        	text: null
	        },
	        tooltip: {
	            pointFormat: '<b>{point.y}</b>'
	        },
	        plotOptions: {
	            pie: {
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    },
	                    connectorColor: 'silver'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Kjønn',
	            data: [
	                {name: 'Menn', y: male},
	                {name: 'Kvinner', y: female}
	            ]
	        }]
	    };
	}
});
