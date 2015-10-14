var express = require('express');

module.exports = function (messages) {
  var router = express.Router();

  router.post('/', function (req, res, next) {
    var message = JSON.parse(JSON.stringify(req.body));

    messages.createMessage({
        email: message.email,
        phone: message.phone,
        lname: message.lname,
        fname: message.fname,
        body: message.body
      }, function (message) {
        res.sendStatus(201);
    });
  });

  router.get('/', function (req, res, next) {
    messages.readAllMessages(function (messages) {
      res.end(JSON.stringify(messages));
    });
  });

  router.delete('/:message_id', function (req, res, next) {
    messages.markMessageDeleted(req.params.message_id, {deleted: true});
    res.end();
  });

  return router;
};
