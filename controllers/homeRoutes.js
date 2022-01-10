const router = require('express').Router();
const { President } = require('../models');

router.get('/', async (req, res) => {

const allBasicPresData = await President.findAll({});

const basicPresData = allBasicPresData.map((presData) => presData.get({ plain: true }));

res.render('homepage', { basicPresData });
});

module.exports = router;