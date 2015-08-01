var app = {};

/*
 * Model
 */

// model definition
app.Message = Backbone.Model.extend({
  defaults: {
    messageId: ''
  }
});


// view
app.MessageView = Backbone.View.extend({
  tagName: 'li',
  className: 'message',
  initialize: function () {
    this.template = _.template($('#message-template').html());
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


/*
 * Collection
 */
var MessageList = Backbone.Collection.extend({ 
  model: app.Message,
  url: 'http://localhost:3000/messages'
});

app.messages = new MessageList();

app.AppView = Backbone.View.extend({
  el: '#messages',
  initialize: function () {
    console.log('appview');
    this.render();
  },
  render: function () {
    var that = this;
    app.messages.fetch({
      success: function (messages) {
        if (app.messages.length) {
          app.messages.each(that.addOne, that);
        }
      }
    });
  },
  addOne: function (message) {
    var view = new app.MessageView({model: message});
    this.$el.append(view.render().el);
  }
});

new app.AppView();

