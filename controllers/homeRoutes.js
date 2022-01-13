const router = require('express').Router();
const { President } = require('../models');
const withAuth = require('../utils/auth');

const sanatize = (value) => {
  return JSON.parse(JSON.stringify(value));
};


router.get('/', async (req, res) => {

  const presidentData = await President.findAll({});

  const presidents = presidentData.map((presData) => presData.get({ plain: true }));


  res.render('homepage', { presidents, loggedIn: req.session.logged_in });
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.post('/search', async (req, res) => {
  try {
    const dbPresData = await President.findOne({ where: { name: req.body.searchTerm } });
    const pres = sanatize(dbPresData)
    res.json(pres);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/president/:id', withAuth, async (req, res) => {
  try{
    const dbPresData = await President.findByPk(req.params.id);
    const pres = sanatize(dbPresData)

    const presidentData = await President.findAll({});
    const presidents = presidentData.map((presData) => presData.get({ plain: true }));

    res.render('president', {pres, presidents, loggedIn: req.session.logged_in});
  }catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;