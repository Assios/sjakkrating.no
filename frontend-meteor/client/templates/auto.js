Template.auto.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 8,
      rules: [
        {
          collection: Players,
          field: "name",
          matchAll: true,
          template: Template.autoCompletePlayers,
        }
      ]
    };
  }
});
