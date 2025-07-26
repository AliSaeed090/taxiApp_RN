module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    // "@babel/plugin-transform-runtime", // Good practice to keep this before others
    // "@babel/plugin-transform-private-methods", // Add this plugin
    "react-native-reanimated/plugin", // MUST be last
  ],
};
