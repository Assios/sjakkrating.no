Template.advancedSearch.onRendered(function() {

    Session.set("currentNameFilter", "");

    ReactiveTable.clearFilters(['currentNameFilter', 'clubFilter', 'greater-than-filter', 'less-than-filter', 'greater-than-age-filter', 'less-than-age-filter', 'chess-club-filter', 'gender-filter']);

});

Template.advancedSearch.helpers({
    players: function () {
        return Players;
    },

    clubFilterFields: function() {
        return ["club"]
    },

    minRatingFields: function() {
        return ["elo"]
    },

    settings: function () {
        return {
            collection: "tableplayers",
            rowsPerPage: 10,
            showColumnToggles: true,
            fields: [
            	{key: 'name', label: 'Navn', hideToggle: true, tmpl: Template.nameTmpl, cellClass: 'col-md-2', sortOrder: 5},
                {key: 'gender', label: 'Kjønn', tmpl: Template.genderTmpl, cellClass: 'col-md-1'},
            	{key: 'club', label: 'Klubb', tmpl: Template.clubTmpl},
            	{key: 'nsf_elo', label: 'Norsk', sortOrder: 1, sortDirection: 'descending'},
            	{key: 'elo', label: 'Uoffisiell', sortOrder: 0, sortDirection: 'descending'},
            	{key: 'fide_standard', label: 'FIDE', sortOrder: 2, sortDirection: 'descending'},
            	{key: 'fide_rapid', label: 'Hurtig', sortOrder: 3, sortDirection: 'descending'},
            	{key: 'fide_blitz', label: 'Lyn', sortOrder: 4, sortDirection: 'descending'},
            	{key: 'number_of_games', label: 'Partier'},
            	{key: 'year_of_birth', label: 'Fødselsår'},
            	{key: 'fide_title', hidden: true, hideToggle: true}
            ],
            filters: [
                'clubFilter',
                'greater-than-filter',
                'less-than-filter',
                'greater-than-age-filter',
                'less-than-age-filter',
                'chess-club-filter',
                'gender-filter',
            ]
        };
    }
});
