Template.auto.helpers({
    settings: function() {
        return {
            position: "bottom",
            limit: 8,
            rules: [{
                collection: 'Players',
                subscription: 'autocompletePlayers',
                field: 'name',
                template: Template.autoCompletePlayers,
                noMatchTemplate: Template.noMatch,
                matchAll: true,
            }]
        };
    }
});
