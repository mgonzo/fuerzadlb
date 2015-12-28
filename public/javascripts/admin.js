var React = require('react');
var ReactDOM = require('react-dom');
/*
 * MessageItemWrapper
 * @return the template for individual message
 */
var MessageItemWrapper = React.createClass({
  onClick: function (e) {
    console.log(e);
    console.log(this.state);
  },

  render: function () {
    return <li className="">
      <span></span>
      <span className="date">{moment(this.props.data.date).format('YYYY MMMM DD h:mm:ss A')}</span>
      <span className="name">
        <span className="fname"> {this.props.data.fname} </span>
        <span> {this.props.data.lname} </span>
      </span>
      <span className="email"><a href={"mailto:" + this.props.data.email}>{this.props.data.email}</a></span>
      <span className="phone">{this.props.data.phone}</span>
      <span className="mark-as-responded">
        <a href="#" onClick={this.onClick}>Read</a>
      </span>
      <span className="message-body">{this.props.data.body}</span>
    </li>
  }
});

/*
 * MessageList
 * @return the template with data loaded from the source
 */
var MessageList = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    }
  },

  componentDidMount: function() {
    $.get(this.props.source, function (data) {
      if (this.isMounted()) {
        this.setState({
          messages: JSON.parse(data)
        });
      }
    }.bind(this));
  },

  handleClick: function (e) {
    console.log(e);
  },

  onChange: function (e) {
    console.log(e);
  },

  render: function() {

    // set key prop, could be an id from the data store instead
    // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    this.state.messages.map(function (item, index) {
      item.key = Date.now() + index;
    });

    // render the list
    return (
        <div>
          <ul> {
            this.state.messages.map( function (item, index) {
              return <MessageItemWrapper key={item.key} data={item}/>;
            })
          } </ul>
        </div>
    );
  }
});

/*
 * Load data from the source endpoint into an element
 */
ReactDOM.render(
    <MessageList source="/messages"/>,
    document.getElementById('messages')
);
