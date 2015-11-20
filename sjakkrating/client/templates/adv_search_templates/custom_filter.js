Template.greaterThanFilter.created = function () {
  this.filter = new ReactiveTable.Filter('greater-than-filter', ['elo']);
};

Template.lessThanFilter.created = function () {
  this.filter = new ReactiveTable.Filter('less-than-filter', ['elo']);
};

Template.greaterThanAgeFilter.created = function () {
  this.filter = new ReactiveTable.Filter('greater-than-age-filter', ['year_of_birth']);
};

Template.lessThanAgeFilter.created = function () {
  this.filter = new ReactiveTable.Filter('less-than-age-filter', ['year_of_birth']);
};

Template.chessClubFilter.created = function () {
  this.filter = new ReactiveTable.Filter('chess-club-filter', ['club']);
};

Template.genderFilter.created = function () {
  this.filter = new ReactiveTable.Filter('gender-filter', ['gender']);
};


Template.greaterThanAgeFilter.events({
   "keyup .greater-than-age-filter-input, input .greater-than-age-filter-input": function (event, template) {
      var input = parseInt($(event.target).val(), 10) -1;
      if (!_.isNaN(input)) {
        template.filter.set({'$gt': input});
        Session.set("filtergreaterAge", input);
      } else {
        template.filter.set("");
      }
   }
});

Template.lessThanAgeFilter.events({
   "keyup .less-than-age-filter-input, input .less-than-age-filter-input": function (event, template) {
      var input = parseInt($(event.target).val(), 10) +1;
      if (!_.isNaN(input)) {
        template.filter.set({'$lt': input});
      } else {
        template.filter.set("");
      }
   }
});

Template.greaterThanFilter.events({
   "keyup .greater-than-filter-input, input .greater-than-filter-input": function (event, template) {
      var input = parseInt($(event.target).val(), 10) -1;
      if (!_.isNaN(input)) {
        template.filter.set({'$gt': input});
      } else {
        template.filter.set("");
      }
   }
});

Template.lessThanFilter.events({
   "keyup .less-than-filter-input, input .less-than-filter-input": function (event, template) {
      var input = parseInt($(event.target).val(), 10) +1;
      if (!_.isNaN(input)) {
        template.filter.set({'$lt': input});
      } else {
        template.filter.set("");
      }
   }
});

Template.chessClubFilter.helpers({
    listClubs: function() {
        return Clubs.find({}, {
            sort: {
                name: 1
            }
        });
    }
});

Template.chessClubFilter.events({
  "change select": function(event, template) {
    chess_club = $('#chessClub').val()

    if (chess_club && (chess_club != "Alle")) {
      template.filter.set(chess_club);
    }
    else {
      template.filter.set("");
    }
  }
});

Template.genderFilter.events({
  "change .radio-gender": function(event, template) {
    gender_box = $('input:radio[name=gender]:checked').val();

    if (!(gender_box == 'both')) {
      template.filter.set(gender_box);
    }
    else {
      template.filter.set("");
    }
  }
});
