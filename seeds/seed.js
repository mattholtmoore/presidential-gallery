const sequelize = require('../config/connection');
const { User , President } = require('../models');

const userData = require('./userData.json');
const presidentSeedData = require('./presidentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await President.bulkCreate(presidentSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
