'use strict';
const router = require('koa-router')();
const fundController = require('./controllers/fund');
const apiFundController = require('./controllers/api/fund');

router.get('/fund', fundController.render);

router.get('/api/v1/fund/:id',apiFundController.getGraphInfo);
router.get('/api/v1/fundIds',apiFundController.getFundIds);


module.exports = router;