const path = require('path');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 1,
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
    platformName: "Android",
    deviceName: "emulator",
    // change this to your emulator's name
    app: path.resolve(__dirname, "../android/app/build/outputs/apk/debug/app-debug.apk"),
    appPackage: "com.cennznetidentityprovider",
    appActivity: ".MainActivity",
    automationName: "UiAutomator2",
    autoGrantPermissions: true,
}];

exports.config = config;
