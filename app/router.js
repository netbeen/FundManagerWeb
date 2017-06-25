'use strict';
const router = require('koa-router')();
const fundController = require('./controllers/fund');
const wealthController = require('./controllers/wealth');
const apiFundController = require('./controllers/api/fund');
const apiWealthController = require('./controllers/api/wealth');

router.get('/api/v1/fund/:id',apiFundController.getGraphInfo);
router.get('/api/v1/fundIds',apiFundController.getFundIds);

router.get('/api/v1/wealthDistribution',apiWealthController.getWealthDistribution);
router.get('/api/v1/wealthType',apiWealthController.getTypes);

router.get('/fund', fundController.render);
router.get('/wealth', wealthController.render);
router.get('/login', wealthController.login);

module.exports = router;