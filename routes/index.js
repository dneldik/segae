const Users = require('../models/users');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('index', { title: 'Programming ', user });
});

/* GET login page. */
router.get('/login', (req, res) => {
  if (req.session.user) res.redirect('/user');
  else res.render('login', { title: 'sign in' });
});

router.post('/login', (req, res) => {

  const { login, password } = req.body;

  Users.findOne({ user: login }, (err, user) => {

    let userLogin = undefined;
    let userPassword = undefined;

    if (user !== null) {
      userLogin = user.user;
      userPassword = user.password;
    }

    if (login === userLogin && password === userPassword) {
      console.log('\nlogged in');
      req.session.user = userLogin;
      req.session.admin = user.admin;
      res.redirect('/user');
    }
    else {
      console.log('\nwrong');
      res.redirect('/login');
    }

  });

});

/* logout */
router.get('/logout', (req, res) => {
  if (req.session.user) req.session.user = null;
  res.redirect('/login');
});

module.exports = router;
