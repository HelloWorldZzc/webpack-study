const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: true,
    },
    module: {
        rules: [
            // {
            //     test:/\.js$/,
            //     loader: "./loaders/01 loaders_test.js"
            // }
            {
                test:/\.js$/,
                // use: ["./loaders/02 Synchronize_loader.js","./loaders/03 asynchronous_loader.js"]
                // use: ["./loaders/04 raw_loader.js"]
                // use: ["./loaders/05 pitching_loader1.js","./loaders/05 pitching_loader2.js","./loaders/05 pitching_loader3.js","./loaders/05 pitching_loader4.js"]
                // use:["./loaders/06 cancel_console_loader.js"]
                // loader: "./loaders/07 write banner-loader/index.js",
                // options: {
                //     author:"zzc"
                // }
                // loader: "./loaders/08 write babel-loader/index.js",
                // options: {
                //     presets: ["@babel/preset-env"]
                // }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/09 write file-loader/index.js",
                type: "javascript/auto", // 阻止webpack默认处理图片资源，只使用file-loader处理
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"public/index.html")
        })
    ],
    mode: "development"
}
