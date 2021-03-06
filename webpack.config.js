var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var packageJSON = require("./package.json");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/public/index.html",
    filename: "index.html",
    inject: "body"
});

var outputCssFile = new ExtractTextPlugin("[name].css");

var metaDataPlugin = new webpack.DefinePlugin({
    MONPLAN_DESCRIPITON: packageJSON.description,
    MONPLAN_VERSION: JSON.stringify(packageJSON.version),
    MONPLAN_AUTHOR: packageJSON.author,
    MONPLAN_REMOTE_URL: JSON.stringify("https://api2.monplan.tech"),
    MONPLAN_REMOTE_URL2: JSON.stringify("https://monplan-api-dev.appspot.com"),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
});

const config = {
    entry: [
        "./app/index.jsx"
    ],

    output: {
        path: __dirname + "/dist/public",
        filename: "bundle.js",
        publicPath: "/"
    },

    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "!css-loader")
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
                loader: "url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack"
            },
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.pegjs$/, loader: "pegjs-loader"}
        ]
    },

    plugins: [
        metaDataPlugin,
        outputCssFile,
        HtmlWebpackPluginConfig
    ],

    externals: {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true,
    }
};

if(process.env.NODE_ENV !== "production") {
    config.devtool = "eval-source-map";
}

module.exports = config;
