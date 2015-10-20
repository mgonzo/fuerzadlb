var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    res.redirect('/login');
  } else {
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.session.passport.user);
    res.render('admin', { title: 'Admin' });
  }
});

module.exports = router;
