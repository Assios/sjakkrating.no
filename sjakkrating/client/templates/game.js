Template.game.onRendered(function() {
	var config = {
		showNotation: false,
		position: 'start',
	}

	var board1 = ChessBoard('board1', config);

});

Template.game.events({
   ".pager .prev": function () {
      console.log("prev");
   },

   ".pager .next": function () {
      console.log("next");
   },  
});



Template.game.helpers({


});
