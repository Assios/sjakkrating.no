Template.newGame.onRendered(function() {

});

Template.newGame.helpers({

    url: function() {
        SetPgnUrl("/test.pgn");
        SetHighlightOption(true); // true or false
        SetGameSelectorOptions(null, false, 0, 0, 0, 15, 15, 0, 10); // (head, num, chEvent, chSite, chRound, chWhite, chBlack, chResult, chDate);
        SetCommentsIntoMoveText(false);
        SetCommentsOnSeparateLines(false);
        SetAutoplayDelay(1000); // milliseconds
        SetAutostartAutoplay(false);
        SetAutoplayNextGame(false); // if set, move to the next game at the end of the current game during autoplay
        SetInitialGame(1); // number of game to be shown at load, from 1 (default); values (keep the quotes) of "first", "last", "random" are accepted; other string values assumed as PGN search string
        SetInitialVariation(0); // number for the variation to be shown at load, 0 (default) for main variation
        SetInitialHalfmove(0,false); // halfmove number to be shown at load, 0 (default) for start position; values (keep the quotes) of "start", "end", "random", "comment" (go to first comment or variation), "variation" (go to the first variation) are also accepted. Second parameter if true applies the setting to every selected game instead of startup only (default)
        SetShortcutKeysEnabled(false);
    }

});