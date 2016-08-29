const router = require('koa-router')();
const fundController = require('./controllers/fund');

router.get('/fund', fundController.render);

module.exports = router;