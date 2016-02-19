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
        ]
    }
});

Router.map(function () {
  this.route('api/siste', {
    where: 'server',
    action: function () {
      var json = {"last_updated": "18/2/2016", "players": Players.find({ elo: { $gt: 0 } }, {fields: {nsf_id: 1, name: 1, elo: 1, _id: 0}}).fetch()};
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
  }
});
});

Router.map(function () {
  this.route('api/spiller/:_id', {
    where: 'server',
    action: function () {
      var json = Players.findOne({nsf_id: parseInt(this.params._id)}, {fields: {_id: 0, nsf_id: 1, fide_id: 1, name: 1, elo: 1, nsf_elo: 1, fide_standard: 1, fide_rapid: 1, fide_blitz: 1, number_of_games: 1}});
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
  }
});
});

Router.route('/api', {
    name: 'apiDescription'
});

Router.route('/partier', {
    name: 'advancedGames'
});

Router.route('/lichess', {
    name: 'lichessList',
    waitOn: function() {
        return [
            Meteor.subscribe('lichessPlayers'),
        ]
    }
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

Router.route('/l0g1n', {
    name: 'login'
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
        return Games.findOne({
            _id: new Meteor.Collection.ObjectID(this.params._id)
        });
    },
    waitOn: function() {
        return [
            Meteor.subscribe('game', this.params._id)
        ]
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
            Meteor.subscribe('player', this.params._id),
            Meteor.subscribe('player-game-stats', Players.findOne({nsf_id: parseInt(this.params._id)})),
        ]
    }
});

Router.route('spiller/:_id/edit', {
    name: 'playerEdit',
    data: function() {
        return Players.findOne({
            nsf_id: parseInt(this.params._id)
        });
    },
    waitOn: function() {
        return [
            Meteor.subscribe('player', this.params._id),
        ]
    }
});

Router.route('partier/:_id', {
    name: 'advancedGamesPlayer',
    data: function() {
        return Players.findOne({
            nsf_id: parseInt(this.params._id)
        });
    },
    waitOn: function() {
        return [
            Meteor.subscribe('player', this.params._id),
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

Router.route('klubb/:_id/edit', {
    name: 'clubEdit',
    data: function() {
        return Clubs.findOne({
            name: this.params._id
        });
    }
});
