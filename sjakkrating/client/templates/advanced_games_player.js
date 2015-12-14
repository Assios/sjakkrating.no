Template.advancedGamesPlayer.onRendered(function() {

    game_filter = new ReactiveTable.Filter('generalFilter', []);

    var name = this.data.surname + ", " + this.data.only_first_name;

    Session.set("currentNameFilter", name);

    if (name) {
        game_filter.set(name);
        $(".general-filter-input").val(name);
    } else {
        game_filter.set("");
    }

});


Template.advancedGamesPlayer.helpers({

    settings: function() {
        return {
            collection: "tableGames",
            rowsPerPage: 10,
            fields: [{
                key: 'Round',
                label: '',
                tmpl: Template.gameTmpl
            }, {
                key: 'Event',
                label: 'Turnering'
            }, {
                key: 'White',
                label: 'Hvit'
            }, {
                key: 'Black',
                label: 'Svart',
                sortDirection: 'descending'
            }, {
                key: 'Result',
                label: 'Resultat',
                sortOrder: 1,
                sortDirection: 'descending'
            }, {
                key: 'Date',
                label: 'Dato',
                sortOrder: 0,
                sortDirection: 'descending'
            }, ],
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

Template.advancedGamesPlayer.events({

    'click .search': function() {
        var f = $(".general-filter-input").val();

        game_filter.set(f);
    },

});