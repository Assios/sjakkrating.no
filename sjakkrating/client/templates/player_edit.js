Template.playerEdit.helpers({
	isAdmin: function() {
		console.log(Meteor.user());
		return Meteor.user().profile.admin;
	}
});

Template.playerEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var playerProperties = {
      fide_title: $(e.target).find('[name=fide_title]').val(),
      club: $(e.target).find('[name=club]').val(),
      club_lc: $(e.target).find('[name=club]').val().toLowerCase(),
      country: $(e.target).find('[name=country]').val(),
      lichess_username: $(e.target).find('[name=lichess_username]').val(),
    }

    Players.update(this._id, {$set: playerProperties}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        alert("Oppdatert!");
      }	
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Fjern spilleren?")) {
      Players.remove(this._id);
      Router.go('frontPage');
    }
  }
});
