Template.chessGame.onRendered(function() {
	var config = {
		position: 'start',
	}

   game = new Chess();

	 board = ChessBoard('board', config);

   pgn = this.data.moves;
   currentIndex = 0;

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
    },

    'click .end': function(){
      while (currentIndex < pgn.length) {
        game.move(pgn[currentIndex]);
        currentIndex++;
      }

      board.position(game.fen());
    },

    'click .start': function(){
      while (currentIndex > -1) {
        game.undo();
        currentIndex--;
      }

      board.position(game.fen());
    },

});

Template.chessGame.helpers({


});
