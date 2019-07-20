const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Model = Sequelize.Model;

class Account extends Model {
}

Account.init(
    {name: {type: Sequelize.STRING}},
    {
        sequelize: sequelize,
        modelName: 'accounts'
    }
);

class Category extends Model {
}

Category.init(
    {
        name: {type: Sequelize.STRING},
        budget: {type: Sequelize.DOUBLE}
    },
    {
        sequelize: sequelize,
        modelName: 'categories'
    });

class Transaction extends Model {
}

Transaction.init({
        description: {type: Sequelize.STRING},
        value: {type: Sequelize.DOUBLE},
        date: {type: Sequelize.DATE},
        type: {type: Sequelize.STRING}
    },
    {
        sequelize: sequelize,
        modelName: 'transactions'
    }
);

Transaction.belongsTo(Account, {as: 'sourceAccount'});
Transaction.belongsTo(Account, {as: 'destinationAccount'});
Account.hasMany(Transaction, {foreignKey: 'sourceAccountId'});
Transaction.belongsTo(Category);
Category.hasMany(Transaction);

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;
db.Account = Account;
db.Category = Category;
db.Transaction = Transaction;

module.exports = db;


