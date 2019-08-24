const TransactionProxy = require('../infra/proxies/TransactionProxy');
const RouterHelper = require('./RouterHelper');

class TransactionRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new TransactionProxy();
    }

    select(req, res) {
        this.model.findFull()
            .then(rows => res.json(rows))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    selectFrom(req, res) {
        this.model.findFrom(req.params.accountId)
            .then(transactions => res.json(transactions))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    create(req, res) {
        this.model.create(req.body)
            .then(transaction => res.json(transaction))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }
}

module.exports = TransactionRouterHelper;