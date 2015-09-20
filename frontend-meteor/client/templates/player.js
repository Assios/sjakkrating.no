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
	}
});

Template.player.topGenresChart = function() {
    return {
        title: {
            text: 'Ratinggraf',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan 2014', 'Apr 2014', 'Jun 2014', 'Sep 2014', 'Jan 2015', 'Apr 2015', 'Jun 2015', 'Sep 2015']
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
            name: 'Offisiell elo',
            data: [2874, 2894, 2887, 2849, 2849, 2854, 2854, 2849]
        }],
        credits: false,
    };
};