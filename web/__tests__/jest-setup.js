const regeneratorRuntime = require('regenerator-runtime');

module.exports = () => {
  global.testServer = require('../dist/server/server');
};
