const { Sequelize, DataTypes } = require('sequelize');

// connecting to an AWS cloud MySql database
const db = new Sequelize('database_1', 'admin', 'test1234', {
  host: 'database-1.c9r58b2hlfa8.eu-central-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
});

// defining a transaction table inside the database
const Transaction = db.define('transaction', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transaction