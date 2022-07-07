/*
*
* 本插件用于展示展示作者信息的插件，作者的名字需要从option中读取
{
//所接收到的参数为object类型
  "type": "object",
  "properties": {
  //属性author的类型为string类型
    "author": {
      "type": "string"
    }
  },
  //不允许在添加新的属性
  "additionalProperties": false
}
*
* */
const schema = require("./index.json");
module.exports = function (content) {
    // schema对options的验证规则
    // schema符合JSON Schema的规则
    const options = this.getOptions(schema);
    const prefix = `
    /*
    * Author: ${options.author}
    */
  `;
    return prefix + content;
};
