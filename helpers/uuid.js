var uuid = (function () {
  var uuid = function (options) {};

  uuid.prototype.getNewId = function () {
    var s4 = function () {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();

  };

  return uuid;
})();

module.exports = uuid;
