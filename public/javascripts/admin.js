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

  render: function() {
    return (
        <div>
          <ul> {
            this.state.messages.map( function (item, index) {
              return <li className="">
                <span></span>
                <span className="date">{moment(item.date).format('YYYY MMMM DD h:mm:ss A')}</span>
                <span className="name">
                  <span className="fname"> {item.fname} </span>
                  <span> {item.lname} </span>
                </span>
                <span className="email"><a href="#">{item.email}</a></span>
                <span className="phone">{item.phone}</span>
                <span className="mark-as-read"><input type="checkbox"/></span>
                <span className="message-body">{item.body}</span>
              </li>
            })
          } </ul>
        </div>
    );
  }
});

React.render(
    <MessageList source="/messages"/>,
    document.getElementById('messages')
);
