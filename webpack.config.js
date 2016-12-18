var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

const config = {
    entry: [
        "./index.jsx"
    ],

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

    plugins: process.env.NODE_ENV === JSON.stringify("production") ? [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ],

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

if(process.env.NODE_ENV !== JSON.stringify("production")) {
    config.devtool = "source-map";
}

module.exports = config;
