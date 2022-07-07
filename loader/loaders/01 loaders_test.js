/*
* loader就是一个函数
* 当webpack解析资源时，会调用相应的loader去处理
* loader接受到文件内容作为参数，会返回出去
* content：文件内容
* map：sourceMap
* mata：别的loader传递的数据
*
*
* 这是一个load函数，进行解析的过程如下
* 配置好了webpack，在rules看到需要解析js文件，那么需要调用相关的loader
* 由于填充的路径是此，因此会调用本loader
* */
module.exports = function loader1(content) {
    console.log("hello loader");
    return content;
};
