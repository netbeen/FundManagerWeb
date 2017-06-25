'use strict';
var default_env = 'production';
var node_env = process.env.NODE_ENV || default_env;
var overrideConfig = require('./' + node_env + '.json');
var baseConfig = require('./base.json');
var secretConfig = require('./secret.json');
var merge = require('../utils/extension').deepMerge;
var config = merge(baseConfig, secretConfig);
config = merge(config, overrideConfig);
config.staticFiles = require('./staticFiles');
module.exports = config;
