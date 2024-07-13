/* eslint-disable */

const { createWebpackDevConfig } = require("@craco/craco");
const cracoConfig = require("./craco.config.cjs");
const webpackConfig = createWebpackDevConfig(cracoConfig);

module.exports = webpackConfig;
