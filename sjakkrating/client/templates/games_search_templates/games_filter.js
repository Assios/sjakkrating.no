Template.surnameFilter.created = function () {
  this.filter = new ReactiveTable.Filter('surname-filter', ['WhiteSurname']);
};

Template.surnameFilter.events({
   "keyup .surname-filter-input, input .surname-filter-input": function (event, template) {
   	var input = $(event.target).val();

      if (_.isNaN(input)) {
        template.filter.set({'$eq': input});
      } else {
        template.filter.set("");
      }
   }
});
