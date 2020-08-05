module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@fos/assets": "./src/assets",
          "@fos/components": "./src/components",
          "@fos/config": "./src/config",
          "@fos/constants": "./src/constants",
          "@fos/containers": "./src/containers",
          "@fos/helpers": "./src/helpers",
          "@fos/locale": "./src/locale",
          "@fos/navigation": "./src/navigation",
          "@fos/redux": "./src/redux",
          "@fos/screens": "./src/screens",
          "@fos/themes": "./src/themes",
          "@fos/utils": "./src/utils",
        },
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      },
    ],
  ],
};
