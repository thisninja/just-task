'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

module.exports = (environment === 'development')
  ? require('./config/webpack.dev.config')
  : require('./config/webpack.prod.config');
