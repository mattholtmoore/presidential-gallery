const router = require('express').Router();
const { President } = require('../../models');
const withAuth  = require('../../utils/auth');

router.get('/', async (req, res) => {
    const allBasicPresData = await President.findAll({});

   return res.json(allBasicPresData);
});

router.get('/details/:id', withAuth, async (req, res) => {
    const { id } = req.params;
    const allDetailedPresData = await President.findOne({});

   return res.json(allDetailedPresData);
});

module.exports = router;