Template.advancedSearch.onRendered(function() {

  $("#chessTable").stupidtable();

  delete Session.keys["filter_object"];

});

Template.advancedSearch.helpers({
  filteredPlayers: function() {
    if (Session.get("filter_object"))
      return Players.find(Session.get("filter_object"), {sort: {elo: -1}, limit: Session.get("result_limit")});
    else
      return [];
  },

  isMale: function(gender) {
    if (gender=='M') {
      return true;
    }
    return false;
  },

  listClubs: function() {
    return Clubs.find({}, {sort: { club_name: 1 }});
  }
});

Template.advancedSearch.events({
  'click .advanced-search': function () {
    chess_club = $('#chessClub').val()
    min_rating = parseInt($("#minRating").val())-1;
    max_rating = parseInt($("#maxRating").val())+1;
    min_year_of_birth = parseInt($("#minYearOfBirth").val())-1;
    max_year_of_birth = parseInt($("#maxYearOfBirth").val())+1;
    number_of_results = parseInt($("#numberOfResults").val());

    obj = { nsf_elo: { $gt: min_rating, $lt: max_rating }, year_of_birth: { $gt: min_year_of_birth, $lt: max_year_of_birth } }

    if (chess_club && (chess_club!="Alle")) {
      $.extend(obj, { club_lc: chess_club.toLowerCase() });
    }

    gender_box = $('input:radio[name=gender]:checked').val();

    if (!(gender_box=='both')) {
      $.extend(obj, { gender: gender_box });
    }

    Session.set("result_limit", number_of_results);
    Session.set("filter_object", obj);
  }
});
