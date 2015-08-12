
var React = window.React = require('react'),
    TopList = require("./components/TopList"),
    mountNode = document.getElementById("app");

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  render: function() {
    return (
      <div>
        Test <TopList url="http://assios.no/rating.json" />
      </div>
    );
  }
});

React.render(<TodoApp />, mountNode);
