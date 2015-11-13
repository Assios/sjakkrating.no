Template.autoCompletePlayers.helpers({
    labelBasedOnRatingDifference: function(newRating, oldRating) {
        if (newRating < oldRating) {
            return "label label-danger";
        }
        else if (newRating > oldRating) {
            return "label label-success";
        }
        else {
            return "label label-default";
        }
    },

    title: function(l) {
        if (l.length > 3) {
            return l.substring(0, 3);
        }

        return l;
    },
});
