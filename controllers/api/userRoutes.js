const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    const users = await User.findAll({});

   return res.json(users);
});