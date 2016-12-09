var HtmlWebpackPlugin = require("html-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    entry: [
        "./app/index.jsx"
    ],

    devtool: "eval-source-map",

    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },

    externals: {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true,
    },

    plugins: [HtmlWebpackPluginConfig]
};
