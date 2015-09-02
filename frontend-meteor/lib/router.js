Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {name: 'frontPage'});

Router.route('spiller/:_id', {
    name: 'player',
    data: function(){
    return {_id: this.params._id};
    }
});
