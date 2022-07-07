//本loader是将图片的格式进行输出的loader
//使用webpack的第三方插件
const loaderUtils = require("loader-utils");
module.exports = function (content) {
    // 1. 根据文件内容生成带hash值文件名
    let interpolatedName = loaderUtils.interpolateName(this, "[hash].[ext][query]", {
        content,
    });
    //指定所放的文件夹
    interpolatedName = `images/${interpolatedName}`
    // 2. 将文件输出出去，使用API输出
    this.emitFile(interpolatedName, content);
    // 3. 返回：module.exports = "文件路径（文件名）"，不然无法处理会报错
    return `module.exports = "${interpolatedName}"`;
};

// 需要处理图片、字体等文件。它们都是buffer数据
// 需要使用raw loader才能处理
module.exports.raw = true;
