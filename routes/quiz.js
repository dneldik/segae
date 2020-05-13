const express = require('express');
const Languages = require('../models/languages');

const router = express.Router();

/* GET quiz page. */
router.get('/', (req, res) => {

  const vote = !req.session.vote;

  Languages.find({}, (err, data) => {
    let allVotes = 0;
    data.forEach(element => {
      allVotes = allVotes + element.votes;
    });

    res.render('quiz', { title: 'Quiz', data, vote, allVotes });
  });

});

router.post('/', (req, res) => {

  const voteId = req.body.vote;

  Languages.findOne({ _id: voteId }, (err, data) => {
    data.votes += 1;
    data.save(err => {
      req.session.vote = true;
      res.redirect('/quiz');
    });
  });

});

module.exports = router;
