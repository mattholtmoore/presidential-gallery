const router = require('express').Router();
const userRoutes = require('./userRoutes');
const presidentRoutes = require('./presidentRoutes');

router.use('/users', userRoutes);
router.use('/president', presidentRoutes);

module.exports = router;