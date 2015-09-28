Template.filter.helpers({
  filteredPlayers: function() {
    if (Session.get("filter_object"))
      return Players.find(Session.get("filter_object"), {sort: {elo: -1}, limit: 10});
    else
      return [];
  }
});

Template.filter.events({
  'click .club-submit': function () {
    chess_club = $("#chessClub").val();
    min_rating = parseInt($("#minRating").val());
    max_rating = parseInt($("#maxRating").val());
    min_year_of_birth = parseInt($("#minYearOfBirth").val());
    max_year_of_birth = parseInt($("#maxYearOfBirth").val());

    obj = { nsf_elo: { $gt: min_rating, $lt: max_rating }, year_of_birth: { $gt: min_year_of_birth, $lt: max_year_of_birth } }

    console.log(obj);

    if (chess_club) {
      $.extend(obj, { club: chess_club });
    }

    Session.set("filter_object", obj);
  }
});
