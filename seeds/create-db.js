const mysql = require('mysql2/promise');
require('dotenv').config();

const init = async () => {
  const { DB_USER, DB_NAME } = process.env;
  const db = await mysql.createConnection({ user: DB_USER });
  await db.query('CREATE DATABASE IF NOT EXISTS ??', DB_NAME);
  console.log('Success!');
  return process.exit(0);
};

init();