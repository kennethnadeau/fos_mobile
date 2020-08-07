# FlatsOrSpikes

FlatsOrSpikes is a React Native app currently targeting iOS and Android.
FlatsOrSpikes is built with yarn 1.13.0, node v14.4.0 and CocoaPods v1.8.4

## Install

You will need Node, Yarn, Watchman, React Native CLI, Xcode 11.4.1 (11E503a), and CocoaPods.

### Node, Yarn, Watchman

We recommend installing Node, Yarn, and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```sh
$ brew install yarn
$ brew install watchman
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

### Xcode

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.

### Android Studio

Install Android Studio and set up a device:
From the homescreen, click Configure > AVD. Follow the steps on the screen.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### CocoaPods

CocoaPods is built with Ruby and is installable with the default Ruby available on macOS. We recommend you use the default ruby.

```sh
$ sudo gem install cocoapods
```

### Dependencies

Run the following commands in a Terminal at root of source directory:

```sh
$ yarn
$ yarn pod
```
## Run

Run the following commands in separate Terminal windows at root of source directory:

```sh
$ yarn start
$ yarn ios
$ yarn android
```

## File Generator

We are using `plop` as a code generator.

### Generating Screens

```
yarn plop

$ ? Screen name: MyScreen
```

## Troubleshooting

If "yarn ios" builds with errors:
- yarn pod

If the simulator has errors, but the build works:

- delete and reinstall node_modules
- yarn start --reset-cache
- delete the Derived Data folder in XCode

If "yarn android" builds with errors:
- make sure you have SDK 28

1. File /Users/<your_name>/.android/repositories.cfg could not be loaded.
- make sure you have a device set up in Android Studio

2. Failed to install the following Android SDK packages as some licences have not been accepted.
- In Android Studio, go to Configure > SDK. In the left panel, Appearance & Behavior > System Settings > Android SDK. Check Show Package Details. Check Android 9.0 (Pie), Android SDK Platform 28, Sources for Android 28, Google Play Intel x86 Atom System Image. Click OK, accept the agreement.
- In the SDK Tools tab, install: Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools, Android SDK Tools, Intel x86 Emulator Accelerator (HAXM installer)

3. com.android.builder.testing.api.DeviceException: No connected devices!
- Go to Configure > AVD, click the Play button to launch the emulator.
- In terminal, run: `yarn android`

4. error Failed to launch emulator. Reason: No emulators found as an output of `emulator -list-avds`.
- Find the path where the SDK platform tools were installed. Then run (e.g.):
```sh
$ echo 'export PATH="/Users/<your_name>/Library/Android/sdk/platform-tools:/Users/<your_name>/Library/Android/sdk/tools:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
```