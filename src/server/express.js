const express = require("express");
const path = require("path");
const webpack = require("webpack");

const config = require("../../config/webpack.dev");
const complier = webpack(config);

const server = express();

const webpackDevMiddleware = require("webpack-dev-middleware")(
  complier,
  config.devServer
);

server.use(webpackDevMiddleware);

const webpackHotMiddleware = require("webpack-hot-middleware")(complier);

server.use(webpackHotMiddleware);

const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

server.listen(8080, () => {
  console.log("Server Listening");
});
