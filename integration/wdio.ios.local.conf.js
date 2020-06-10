/**
 * WebDriver Configuration for Local Testing (iOS Simulator)
 */
const path = require('path');
const os = require('os');
const glob = require('glob');
const { config } = require('./wdio.shared.conf');

config.capabilities = [
  {
    maxInstances: 1,
    platformName: 'iOS',
    platformVersion: '12.1',
    automationName: 'XCUITest',
    // deviceName: 'iPhone 8',
    // app: glob
    //   .sync(
    //     path.resolve(
    //       os.homedir(),
    //       'Library/Developer/Xcode/DerivedData/CennznetIdentityProvider-dqptibfujljebvgksldgjekldgzg/Build/Products/Release-iphonesimulator/CennznetIdentityProvider.app',
    //     ),
    //   )
    //   .pop(),
    bundleId: 'ai.centrality.cennznet.CennznetIdentityProvider',
    udid: '00008020-000A75622202002E',
    deviceName: 'iPhone XR',
    xcodeOrgId: 'BC345YQY32',
    xcodeSigningId: 'iPhone Developer',
    app: glob
      .sync(
        path.resolve(
          os.homedir(),
          'Library/Developer/Xcode/DerivedData/CennznetIdentityProvider-dqptibfujljebvgksldgjekldgzg/Build/Products/Debug-iphoneos/CennznetIdentityProvider.app',
        ),
      )
      .pop(),
    automationName: 'XCUITest',
    autoAcceptAlerts: true,
  },
];

exports.config = config;
