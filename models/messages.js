var UUID = require('../helpers/uuid');
var uuid = new UUID();

var Messages = (function () {
  var Messages = function (options) {
    var messageSchema = options.db.Schema({
      messageId: String,
      date: Date,
      deleted: Boolean,
      email: String,
      lname: String,
      fname: String,
      body: String,
      phone: String,
    });

    this.Message = options.db.model('Message', messageSchema);
  };

  Messages.prototype.createMessage = function (message, callback) {
    this.Message.create({
      messageId: uuid.getNewId(),
      date: new Date(),
      deleted: false,
      email: message.email,
      phone: message.phone,
      lname: message.lname,
      fname: message.fname,
      body: message.body
    }, function (err, message) {
      if(err) throw err;
      if (callback && typeof callback === 'function') {
        callback(({
          messageId: message.messageId,
          date: message.date,
          email: message.email,
          phone: message.phone,
          lname: message.lname,
          fname: message.fname,
          body: message.body
        }));
      }
    });
  };

  Messages.prototype.readAllMessages = function (callback) {
    this.Message.find(function (err, messages) {
      if(err) throw err;
      
      var list = [];
      messages.forEach(function (message) {
        list.push({
          messageId: message.messageId,
          date: message.date,
          deleted: message.deleted,
          email: message.email,
          phone: message.phone,
          lname: message.lname,
          fname: message.fname,
          body: message.body
        });
      });
      if (callback && typeof callback === 'function') {
        callback(list);
      }
    });
  };

  Messages.prototype.markMessageDeleted = function (id, data) {
    this.Message.update({messageId: id}, data, function (err) {
      if(err) throw err;
    });
  };

  return Messages;
})();

module.exports = Messages;
