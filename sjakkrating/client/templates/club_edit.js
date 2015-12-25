Template.clubEdit.helpers({
	isAdmin: function() {
		console.log(Meteor.user());
		return Meteor.user().profile.admin;
	}
});

Template.clubEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var clubProperties = {
      name: $(e.target).find('[name=name]').val(),
      website: $(e.target).find('[name=website]').val(),
    }

    Clubs.update(this._id, {$set: clubProperties}, function(error) {
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
      Clubs.remove(this._id);
      Router.go('frontPage');
    }
  }
});
