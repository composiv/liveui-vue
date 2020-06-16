'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/liveui-vue.production.min.js');
} else {
  module.exports = require('./umd/liveui-vue.development.js');
}
