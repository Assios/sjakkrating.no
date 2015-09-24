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

	lastElement: function(list) {
		return _.last(list);
	},

	getImage: function() {
		return Session.get('img_url');
	},

	ratingChart: function() {
			var nsf_elos_peak = [],
      majorPeakVal = 70,
      len = this.nsf_elos.length,
      i,
      prevVal = this.nsf_elos[i],
      lab = '';

	    for (i = 0; i < len; i++) {
	        if (this.nsf_elos[i] - prevVal > majorPeakVal) {
	            lab = '+' + (this.nsf_elos[i] - prevVal);
	        } else if (prevVal - this.nsf_elos[i] > majorPeakVal) {
	            lab = (this.nsf_elos[i] - prevVal);
	        } else {
	            lab = '';
	        }
	        nsf_elos_peak.push({
	            y: this.nsf_elos[i],
	            label: lab
	        });
	        prevVal = this.nsf_elos[i];
	    }

	    return {
	    		chart: {
	    			zoomType: 'x'
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
	        plotOptions: {
	            series: {
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.label}'
	                }
	            }
	        },
	        series: [{
	          name: 'Norsk elo (Offisiell)',
	          data: nsf_elos_peak
	        },
	        {
	        	name: 'FIDE-elo',
	        	data: this.fide_elos
	        },
	        {
	        	name: 'Hurtig',
	        	data: this.rapid_elos
	        },
	        {
	        	name: 'Lyn',
	        	data: this.blitz_elos
	        }],
	        credits: false,
	    };
	}
});
