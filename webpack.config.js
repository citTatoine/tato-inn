const webpack = require("webpack");
const path = require("path");

var jF = path.resolve(__dirname, "js");
var bF = path.resolve(__dirname, "build");

var config = {
    entry: {
        "order":jF+"/order.js",
        //"login":jF+"/login.js",
        vendor: ['angular']
    },
    output:{
        filename:"[name]bundle.js",
        path:bF
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin( {name: "vendor",  filename: "vendor.bundle.js"})
    ]
};

module.exports = config;