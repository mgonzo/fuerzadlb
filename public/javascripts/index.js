var app = {
  viewDefinition: [],
  views: []

};

app.viewDefinition.push(Backbone.View.extend({
  el: '#map',
  className: 'map',
  initialize: function () {
    this.render();
  },
  render: function () {
    var mapCanvas = this.el;
    var myLatlng = new google.maps.LatLng(32.736864, -97.11343);
    var mapOptions = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
    });
  }
}));

app.viewDefinition.push(Backbone.View.extend({
  el: '#contact',
  className: 'contact',
  initialize: function () {
    this.render();
  },

  events: {
    'click .submit': 'sendMail'
  },

  sendMail: function (e) {
    console.log('sending mail...');
    $el = $(this.el);
    var message = {
      lname: $el.find('.lname').val(),
      fname: $el.find('.fname').val(),
      email: $el.find('.email').val(),
      phone: $el.find('.phone').val(),
      body: $el.find('.body').val()
    };

    console.log(message);
    var jqXhr = $.ajax({
      url: '/contact',
      method: 'POST',
      dataType: 'json',
      data: message
    });

    jqXhr.done(function (data, status, jqXhr) {
      console.log(status);
      console.log(data);
    });

    jqXhr.fail(function (jqXhr, status, error) {
      console.log(error);
    });

  },

  render: function () {
  }
}));

app.viewDefinition.push(Backbone.View.extend({
  className: 'phone',
  initialize: function () {
    this.render();
  },
  render: function () {
    $('.phone').html('1 (817) 504-4270');
  }
}));

app.viewDefinition.push(Backbone.View.extend({
  className: 'address',
  initialize: function () {
    this.render();
  },
  render: function () {
    $('.address').html('<span>615 W. Main St.</span><span>Arlington, TX</span><span>76010</span>');
  }
}));



$(function () {
  app.viewDefinition.forEach(function (defined) {
    app.views[defined.className] = new defined();
  });
});