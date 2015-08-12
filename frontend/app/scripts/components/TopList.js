var React = require('react');

var data = [
  {test: "Test1"},
  {test: "Test2"}
];

var TopList = React.createClass({
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>Yo {this.props.url}</div>
    );
  }
});

module.exports = TopList;
