// webpack.dev.js
//tip：两个环境下的文件有很多可以重复利用的部分，可通过const isProduction = process.env.NODE_ENV === "production";
//获取当前的环境是什么环境，在根据不同的换件做出不同的配置判断，能够合成在一个文件里面
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const getStyleLoaders = (preProcessor) => {
    return [
        "style-loader",
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/js/[hash:10][ext][query]",
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        // 用来匹配 .css 结尾的文件
                        test: /\.css$/,
                        // use 数组里面 Loader 执行顺序是从右到左
                        use: getStyleLoaders(),
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoaders("less-loader"),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoaders("sass-loader"),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoaders("stylus-loader"),
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                            },
                        },
                    },
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.(jsx|js)$/,
                        include: path.resolve(__dirname, "../src"),
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            plugins: [
                                // "@babel/plugin-transform-runtime", // presets中包含了
                                //改动即体现出在页面上需要热更新，但是修改js代码的时候还是会刷新整个界面
                                //因此需要使用这个插件，来保证局部刷新，第一步在这写明，第二部在插件部分说明即可
                                "react-refresh/babel", // 开启js的HMR功能
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        //// 解决js的HMR功能运行时全局变量的问题，第二部，在此处声明即可完成
        new ReactRefreshWebpackPlugin(),
        // 将public下面的资源复制到dist目录去（除了index.html）
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    toType: "dir",
                    noErrorOnMissing: true, // 不生成错误
                    globOptions: {
                        // 忽略文件
                        ignore: ["**/index.html"],
                    },
                    info: {
                        // 跳过terser压缩js
                        minimized: true,
                    },
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
    },
    //webpack解析
    resolve: {
        //例如 import x from "xxx" 在react中都是能省略的，是因为react-cli帮我们自动补全了
        //这里是我们自己配置相关的环境，因此需要补充
        //注意顺序，自动补充一个后，后面的就不看了
        extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
    },
    devServer: {
        open: false,
        host: "localhost",
        port: 3000,
        hot: true,
        compress: true,
        historyApiFallback: true, // 解决react-router刷新404问题
    },
    mode: "development",
    devtool: "cheap-module-source-map",
};
