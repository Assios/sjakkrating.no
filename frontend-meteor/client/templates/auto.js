Template.auto.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: Players,
          field: "name",
          matchAll: true,
          template: Template.autoCompletePlayers,
          noMatchTemplate: Template.noMatch,
        }
      ]
    };
  }
});
