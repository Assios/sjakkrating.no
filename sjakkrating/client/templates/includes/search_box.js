Template.searchBox.helpers({
  playersIndex: () => PlayersIndex,

  inputAttributes: function () {
	    return { 'id': 'auto-input', 'class': 'form-control autocompleteselect input',  'placeholder': 'Søk etter spiller her' };
	},
});

Template.searchBox.events({
    "autocompleteselect input": function(event, template, doc) {
        document.getElementById('auto-input').value = '';
        Router.go('player', {
            _id: doc.nsf_id
        });
    }
});
