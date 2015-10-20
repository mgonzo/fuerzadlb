var validator = require('validator');
var crypto = require('crypto');
var UUID = require('../helpers/uuid');
var uuid = new UUID();
var mongoose = require('mongoose');

var valid = function (input) {
  var out = {};

  if (!input.name || !input.name.length) {
    return false;
  }

  if (!input.password1 || !input.password1.length) {
    return false;
  }

  if (!input.password2 || !input.password2.length) {
    return false;
  }

  out.name = input.name.toString().trim();

  if (input.password1.trim() === input.password2.trim()) {
    out.password = crypto
      .createHash('sha256')
      .update(input.password1.trim())
      .digest('base64');
  }

  return out;
    
};

var Users = (function () {
  var Users = function (options) {
    var userSchema = options.db.Schema({
      userId: String,
      name: String,
      created: Date,
      deleted: Boolean
    });

    this.Users = options.db.model('Users', userSchema);
  };

  Users.prototype.create = function (input, callback) {
    // validate input 
    var user = valid(user);
    if (!user) {
      callback({
        status: 400 // what's the correct status here?
      });
      return;
    }

    this.Users.create({
      userId: uuid.getNewId(),
      name: user.name,
      password: user.password,
      created: new Date(),
      deleted: false
    }, function (err, user) {
      if(err) throw err;
      if (callback && typeof callback === 'function') {
        callback({ 
          status: 201, 
          userId: user.userId 
        });
      }
    });
  };

  Users.prototype.find = function (name, callback) {
    this.Users
      .find(name)
      .exec(function (err, user) {
        if(err) throw err;
        if (callback && typeof callback === 'function') {
          callback({
            id: user.id,
            name: user.name,
            password: user.password
          });
        }
      });
  };

  Users.prototype.update = function (name, callback) {};
  Users.prototype.destroy = function (name, callback) {};

  return  new Users({db: mongoose});
})();

module.exports = Users;
