/**
 * WebDriver Configuration for Device Farm (iOS)
 */
const { config } = require('./wdio.shared.conf');

config.capabilities = [
  {
    maxInstances: 1,
    autoAcceptAlerts: true,
  },
];

exports.config = config;
