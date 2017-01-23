var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var packageJSON = require("./package.json");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

var metaDataPlugin = new webpack.DefinePlugin({
    MONPLAN_DESCRIPITON: packageJSON.description,
    MONPLAN_VERSION: JSON.stringify(packageJSON.version),
    MONPLAN_AUTHOR: packageJSON.author,
    MONPLAN_REMOTE_URL: JSON.stringify("https://api2.monplan.tech"),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
});

const config = {
    entry: [
        "./app/index.jsx"
    ],

    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/"
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },

    plugins: process.env.NODE_ENV === "production" ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        metaDataPlugin,
        HtmlWebpackPluginConfig
    ] : [
        metaDataPlugin,
        HtmlWebpackPluginConfig
    ],

    externals: {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true,
    },

    devServer: {
        headers: { "Access-Control-Allow-Origin": "api.monplan.tech"}
    }
};

if(process.env.NODE_ENV !== "production") {
    config.devtool = "eval-source-map";
}

module.exports = config;
