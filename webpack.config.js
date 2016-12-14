var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    entry: [
        "./index.jsx"
    ],

    devtool: "eval-source-map",

    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: '/'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],

    externals: {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true,
    },

    devServer: {
        headers: { "Access-Control-Allow-Origin": "*"}
    },

    plugins: [HtmlWebpackPluginConfig]
};
