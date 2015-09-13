Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('players'); }
});

Router.route('/', {name: 'frontPage'});

Router.route('spiller/:_id', {
    name: 'player',
    data: function() { return Players.findOne({nsf_id: parseInt(this.params._id)}); }
});

Router.route('klubb/:_id', {
    name: 'clubPage',
    data: function() { return Clubs.findOne(this.params._id); }
});
