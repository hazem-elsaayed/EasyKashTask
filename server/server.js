const express = require('express');
const { Sequelize } = require('sequelize');
const Transaction = require('./Models/transaction');
const Seller = require('./Models/seller');

app = express();
app.use(express.json());
app.use((req, res, next) => { //Preventing CORS errors
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// connecting to an AWS cloud MySql database
const db = new Sequelize('database_1', 'admin', 'test1234', {
  host: 'database-1.c9r58b2hlfa8.eu-central-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
});

//checking the connection is sucessfull
db.authenticate()
  .then(() => console.log('Successfully connected to DB'))
  .catch((e) => console.log(e));

// one to many relation bet. sellers and transaction
Seller.hasMany(Transaction);
Transaction.belongsTo(Seller);

app.get('/transaction', (req, res) => {
  let { page, per_page, seller_id } = req.query;
  let offset = parseInt((page - 1) * per_page); //offset calculation to get the exact page elements
  Transaction.findAndCountAll({
    where: {
      sellerId: seller_id,
    },
    offset: offset,
    limit: parseInt(per_page),
  })
    .then((recievedData) =>
      res.json({
        data: {
          transaction: recievedData.rows,
          paging: {
            total: recievedData.count,
            current_page: page,
            per_page: per_page,
          },
        },
      })
    )
    .catch(console.log);
});

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is running on port ${port}`));
module.exports = {app, db};
