Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    progressDelay: 500,
    progressSpinner: false,
    waitOn: function() {
        return [
            Meteor.subscribe('topPlayers'),
            Meteor.subscribe('topJuniors'),
            Meteor.subscribe('topWomen'),
            Meteor.subscribe('clubs'),
            Meteor.subscribe('games'),
        ]
    }
});

Router.route('/partier', {
    name: 'gamesList'
});

Router.route('/', {
    name: 'frontPage'
});

Router.route('/om', {
    name: 'about'
});

Router.route('/sok', {
    name: 'advancedSearch'
});

Router.route('/aldersgrupper', {
    name: 'ageTop',
    waitOn: function() {
        return [
            Meteor.subscribe('topKadetts'),
            Meteor.subscribe('topLilleputts'),
            Meteor.subscribe('topMiniputts'),
            Meteor.subscribe('topSeniors'),
        ]
    }
});

Router.route('/statistikk', {
    name: 'stats',
    waitOn: function() {
        return [
            Meteor.subscribe('stats'),
            Meteor.subscribe('youngestPlayer'),
            Meteor.subscribe('oldestPlayer'),
        ]
    }
});

Router.route('parti/:_id', {
    name: 'chessGame',
    data: function() {
        return Games.findOne(this.params._id);
    }
});

Router.route('spiller/:_id', {
    name: 'player',
    data: function() {
        return Players.findOne({
            nsf_id: parseInt(this.params._id)
        });
    },
    waitOn: function() {
        return [
            Meteor.subscribe('player', this.params._id)
        ]
    }
});

Router.route('klubb/:_id', {
    name: 'clubPage',
    data: function() {
        return Clubs.findOne({
            name: this.params._id
        });
    },
    waitOn: function() {
        return [
            Meteor.subscribe('clubPlayers', this.params._id)
        ]
    }
});
