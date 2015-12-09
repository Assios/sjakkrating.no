Template.chessGame.onRendered(function() {
	var config = {
		position: 'start',
	}

   game = new Chess();

	 board = ChessBoard('board', config);

   pgn = this.data.moves;
   currentIndex = 0;

   $(document).on('keyup', function (e) {
        if (e.keyCode == 37) {
          game.undo();

          if (currentIndex!=0) {
              currentIndex--;
           }

          board.position(game.fen());          
        }

        if (e.keyCode == 39) {
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
        }
   });


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

    'keypress input': function(event) {
        if (event.keyCode == 13) {
            alert('you hit enter');
            event.stopPropagation();
            return false;
        }
    }

});

Template.chessGame.helpers({


});
