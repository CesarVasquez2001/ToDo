module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Animaciones
    plugins: ["react-native-reanimated/plugin"],
  };
};
