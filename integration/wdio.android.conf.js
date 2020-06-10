/**
 * WebDriver Configuration for Device Farm (Android)
 */
const { config } = require('./wdio.shared.conf');

config.capabilities = [
  {
    maxInstances: 1,
    autoGrantPermissions: true,
  },
];

exports.config = config;
