Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('players'); }
});

Router.route('/', {name: 'frontPage'});
Router.route('/om', {name: 'about'});
Router.route('/sok', {name: 'advancedSearch'});
Router.route('/statistikk', {name: 'stats'});

Router.route('spiller/:_id', {
    name: 'player',
    data: function() { return Players.findOne({nsf_id: parseInt(this.params._id)}); }
});

Router.route('klubb/:_id', {
    name: 'clubPage',
    data: function() { return Clubs.findOne({club_name: this.params._id}); }
});
