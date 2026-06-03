const { withTamagui } = require("@tamagui/next-plugin");

process.env.TAMAGUI_TARGET = "web";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/mnindrazaka.com",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native$": "react-native-web",
      "react-native-svg$": "react-native-svg-web",
    };
    return config;
  },
};

module.exports = function (name, { defaultConfig }) {
  let config = {
    ...defaultConfig,
    ...nextConfig,
  };

  const tamaguiPlugin = withTamagui({
    config: "./tamagui.config.ts",
    components: ["tamagui", "tamakit"],
    disableExtraction: process.env.NODE_ENV === "development",
  });

  return {
    ...config,
    ...tamaguiPlugin(config),
  };
};
