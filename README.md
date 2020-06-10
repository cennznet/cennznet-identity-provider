# Cennznet Identity Application

Cennznet Identity Application is a mobile application that helps users to manage accounts and sign extrinsic(transaction) on CENNZnet.

## Development

### Requirements
Environment: `gem v2.5.2.3+` and `pod v1.8.4+`

* `brew install cocoapods` if pod is not installed
* `brew install brew-gem` if gem is not installed
* `npm install -g react-native-cli` if React Native CLI is not installed

For iOS

* Xcode installed
* Java Development Kit installed

For Android

* Android SDK installed

For JDK

* [JDK]Please make sure the version of JDK is 11 (recommened) or 12. Gradle error occurs in JDK 13.

### Install Dependencies

```bash
yarn install
```

### Install CocoaPods Dependencies:
Go to `ios` folder and run the command:

```bash
pod install
```

### Run application

```bash
yarn run start
```

In another terminal tab, 

##### iOS

```bash
react-native run-ios
```
##### Android
```bash
react-native run-android
```
