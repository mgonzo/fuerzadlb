var MessageList = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    }
  },

  componentDidMount: function() {
    $.get(this.props.source, function (data) {
      console.log(data);
      if (this.isMounted()) {
        this.setState({
          messages: JSON.parse(data)
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
        <div>
          <ul> { 
            this.state.messages.map( function (item, index) { 
              return <li>
                <div>{item.messageId}</div>
                <div>{item.date}</div>
                <div>{item.fname}</div>
                <div>{item.lname}</div>
                <div>{item.deleted}</div>
                <div>{item.email}</div>
                <div>{item.phone}</div>
                <div>{item.body}</div>
              </li> 
            })
          } </ul>
        </div>
    );
  }
});

React.render(
    <MessageList source="http://localhost:3000/messages"/>,
    document.getElementById('messages')
);
