var React = require('react');

var TopList = React.createClass({
  getInitialState: function() {
      return {data: []};
    },
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
      <div>{this.state.data}</div>
    );
  }
});

module.exports = TopList;
