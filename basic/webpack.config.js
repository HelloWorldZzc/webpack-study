//这是开发模式的配置文件
const path=require("path")
const Eslint=require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports={
    //入口文件
    entry: "./src/a.js",//entry文件是相对路径
    output: {
        //所有文件的输出路径
        //开发模式没有输出
        path: path.resolve(__dirname,"dist"),//这里需要使用绝对路径
        //表示输出的内容为js
        filename: "js/main.js",
        //自动清空上次打包的内容
        //原理：在打包前，将path整个目录内容清空，再进行打包
        clean:true
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader, "css-loader"],
                    },
                    {   //图片资源的相关整理
                        test: /\.(png|jpe?g|gif|ico|webp)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                            }
                        },
                        generator: {
                            //表示图片的输出名称与路径
                            //[hash:10] 表示hash值取前10位
                            filename:"images/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?)/,
                        //这种type只会会对文件原封不动的输出
                        type: "asset/resource",
                        generator: {
                            filename: "font/[hash:10][ext][query]"
                        }
                    }
                ]
            }
        ]
    },
    //插件
    plugins: [
        //plugins的相关配置
        new Eslint({
            //指定需要检查文件的目录
            context:path.resolve(__dirname,"src"),
            exclude:"node_modules",//默认值
            cache:true,
            cacheLocation:path.resolve(__dirname,"node_modules/.cache/temp")
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        }),
        new CssMinimizerPlugin()
    ],
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: false, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    },
    //编译模式
    mode:"development",
    devtool: "cheap-module-source-map"
}
