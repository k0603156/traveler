"use strict";
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.GENERATE_SOURCEMAP = "false";

process.on("unhandledRejection", err => {
  throw err;
});

const chalk = require("react-dev-utils/chalk");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const webpack = require("webpack");

const paths = require("../../config/paths");
const webpackClientConfig = require(paths.TravelerConfig + "/webpack.config")(
  "client"
);

console.log(chalk.yellow(`Build Client ${process.env.NODE_ENV}...`));

function build() {
  const compiler = webpack(webpackClientConfig);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      return resolve({
        stats
      });
    });
  });
}
build().then(_ => {
  console.log(chalk.yellow(`Sucess!`));
});