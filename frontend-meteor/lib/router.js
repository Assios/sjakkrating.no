Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {name: 'frontPage'});

Router.route('player/:_id', {
    name: 'player',
    data: function(){
    return {_id: this.params._id};
    }
});
