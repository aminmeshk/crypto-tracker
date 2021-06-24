# CryptoTracker
A little mock app that can show the cryptocurrency changes in the last 24 hours
Used stack:
- React Native
- Typescript
- React Navigation
- Redux
- Redux Saga
- Axios
- React Native Vector Icons

## Running Instructions:
### Run instructions for Android:
- Have an Android emulator running (quickest way to get started), or a device connected.
- `cd` to the project root (where the `package.json` is) & run `npx react-native run-android`
  
### Run instructions for iOS (only on macOS):
#### Installing pods
- Make sure you have Cocoapods installed on your mac. You can verify that by running `pod --version`. If you don't have that installed, you can install it by homebrew from with [this instructions](https://formulae.brew.sh/formula/cocoapods)
- `cd` to the `./ios` folder and run `pod install` 
#### Running:
- `cd` to the project root (where the `package.json` is) & run `npx react-native run-ios`
##### or
- Open `./ios/CryptoTracker.xcworkspace` in Xcode and hit the Run button
