
var React = window.React = require('react'),
    List = require("./components/List"),
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
        Test <List url="http://assios.no:8888" />
      </div>
    );
  }
});

React.render(<TodoApp />, mountNode);
