Template.autoCompletePlayers.helpers({
    labelBasedOnRatingDifference: function(newRating, oldRating) {
        if (newRating < oldRating) {
            return "label label-danger";
        } else if (newRating > oldRating) {
            return "label label-success";
        } else {
            return "label label-default";
        }
    },

});