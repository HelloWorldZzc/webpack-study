//本loader是自定义babel，将高级的语法转化为更低级的语法，具体的转化规则需要用户传入
const babel = require("@babel/core");
const schema = require("./index.json");

// https://www.babeljs.cn/docs/babel-core

module.exports = function (content) {
    // 异步loader
    const callback = this.async();
    //option接收用户的传入方法
    const options = this.getOptions(schema);
    // 使用babel对代码进行编译
    babel.transform(content, options, function (err, result) {
        if (err) callback(err);
        else callback(null, result.code);
    });
};
