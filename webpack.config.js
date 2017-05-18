

const webpack = require("webpack");
const path = require("path");

var jF = path.resolve(__dirname, "js");
var bF = path.resolve(__dirname, "build");

var config = {
    entry: {
        "login":jF+"/login.js",
        //vendor: ['angular'],
        "admin-angular":jF+"/admin-angular.js",
<<<<<<< HEAD
        "order":jF+"/order.js",
=======
>>>>>>> 377a47fce02d93d77831fe322ac8cd24abba15cc
        "admin":jF+"/admin.js",
        "order":jF+"/orderpage.js",
        "owl":jF+"/owl.carousel.min.js",
        "kitchen":jF+"/kitchen.js"
    },
    output:{
        filename:"[name]bundle.js",
        path:bF
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin( {name: "vendor",  filename: "vendor.bundle.js"}),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })

    ]

};

module.exports = config;

