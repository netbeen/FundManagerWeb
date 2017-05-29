'use strict';
var default_env = 'production';
var node_env = process.env.NODE_ENV || default_env;
var overrideConfig = require('./' + node_env + '.json');
var baseConfig = require('./base.json');
var merge = require('../utils/extension').deepMerge;
var config = merge(baseConfig, overrideConfig);
config.staticFiles = require('./staticFiles');
module.exports = config;
