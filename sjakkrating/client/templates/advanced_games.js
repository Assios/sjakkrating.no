Template.advancedGames.onRendered(function() {

    this.filter = new ReactiveTable.Filter('generalFilter', []);

    var name = Session.get("currentNameFilter");

    if (name) {
        this.filter.set(name);
        $(".general-filter-input").val(name); 
    } else {
        this.filter.set("");
    }

});


Template.advancedGames.helpers({

    settings: function () {
        return {
            collection: "tableGames",
            rowsPerPage: 10,
            fields: [
            	{key: 'Round', label: '', tmpl: Template.gameTmpl},
            	{key: 'Event', label: 'Turnering'},
            	{key: 'White', label: 'Hvit'},
            	{key: 'Black', label: 'Svart', sortDirection: 'descending'},
				{key: 'Result', label: 'Resultat', sortOrder: 1, sortDirection: 'descending'},       	
            	{key: 'Date', label: 'Dato', sortOrder: 0, sortDirection: 'descending'},
            ],
            filters: ['generalFilter']
        };
    },

    surnameArray: function() {
        return ['WhiteSurname', 'BlackSurname'];
    },

    firstnameArray: function() {
        return ['WhiteFirstName', 'BlackFirstName'];
    },

});

Template.advancedGames.events({

   "keyup .general-filter-input, input .general-filter-input": function (event, template) {
    var input = $(event.target).val();
    template.filter.set(input);
    console.log(template.filter.get())
   }

});
