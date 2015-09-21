Template.player.onRendered(function() {

	Session.set('img_url', '/images/mysteryman.png');

});

Template.player.helpers({

	loadImage: function(fide_id) {
	  var img = new Image();
	  img.addEventListener('load', function() { // addeventlistener is better than onload
	    if (img.width !== 80) {
	      Session.set('img_url', img.src);
	    } else {
	      Session.set('img_url', '/images/mysteryman.png');
	    }
	  });
	  
	  img.src = 'https://ratings.fide.com/card.php?code=' + fide_id;
	},

	getImage: function() {
		return Session.get('img_url');
	},

	ratingChart: function() {
	    return {
	    		chart: {
	    			zoomType: 'xy'
	    		},
	        title: {
	            text: "Ratinggraf",
	            x: -20 //center
	        },
	        xAxis: {
	            categories: this.nsf_categories
	        },
	        yAxis: {
	            title: {
	                text: 'Elo'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	          name: 'Norsk elo (Offisiell)',
	          data: this.nsf_elos
	        },
	        {
	        	name: 'FIDE-elo',
	        	data: this.fide_elos
	        }],
	        credits: false,
	    };
	}
});
