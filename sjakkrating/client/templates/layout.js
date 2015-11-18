Template.layout.helpers({
    getDate: function() {
        return Session.get('dateObject').format_date;
    },
});

Template.layout.events({
    "autocompleteselect input": function(event, template, doc) {
        document.getElementById('auto-input').value = '';
        if (doc.nsf_id) {
	        Router.go('player', {
	            _id: doc.nsf_id
	        });
	    }
	    else {
	    	Router.go('clubPage', {
	    		_id: doc.name
	    	})
	    }
    }
});
