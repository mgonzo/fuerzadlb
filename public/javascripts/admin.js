var app = {
  viewDefinition: [],
  views: []
};

app.viewDefinition.push(Backbone.View.extend({
  el: '#grid',
  className: 'grid',
  initialize: function () {
    this.render();
  },
  render: function () {
  }
}));

$(function () {
  app.viewDefinition.forEach(function (defined) {
    app.views[defined.className] = new defined();
  });
});

app.Message = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  toggle: function(){
    completed: !this.get('completed')
    this.save({});
  }
});

//var MessageList = Backbone.Collection.extend({ model: app.Message });
