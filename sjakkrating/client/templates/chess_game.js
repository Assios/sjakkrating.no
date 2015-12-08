Template.chessGame.onRendered(function() {
	var config = {
		position: 'start',
	}

   game = new Chess();

   console.log(game);

	 board = ChessBoard('board', config);

   pgn = this.data.moves;
   currentIndex = 0;

   console.log(this.data);
});

Template.chessGame.events({
    'click .next': function(){
        var possibleMoves = game.moves();

        if (currentIndex==pgn.length) {
         return false;
        }

        // exit if the game is over
        if (game.game_over() === true ||
          game.in_draw() === true ||
          possibleMoves.length === 0) return;

        game.move(pgn[currentIndex]);
        currentIndex++;
        board.position(game.fen());
    },

    'click .prev': function(){
        game.undo();

        if (currentIndex!=0) {
            currentIndex--;
         }

        board.position(game.fen());
    },

    'click .flip': function(){
        board.flip();
    }

});

Template.chessGame.helpers({


});
