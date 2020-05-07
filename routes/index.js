const express = require('express');
const router = express.Router();

const userLogin = 'admin';
const userPassword = 'admin1'

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Our website' });
});

/* GET login page. */
router.get('/login', (req, res) => {
  if (req.session.admin) res.redirect('/admin');
  else res.render('login', { title: 'sign in' });
});

router.post('/login', (req, res) => {

  const { login, password } = req.body;

  if (login === userLogin && password === userPassword) {
    console.log('\nlogged in');
    req.session.admin = true;
    res.redirect('/admin')
  }
  else {
    console.log('\nwrong');
    res.redirect('/login')
  }

});

/* logout */
router.get('/logout', (req, res) => {
  if (req.session.admin) req.session = null;
  res.redirect('/login');
});

module.exports = router;
