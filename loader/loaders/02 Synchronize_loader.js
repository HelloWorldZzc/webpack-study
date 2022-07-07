/*
* 同步的loader，存在两种写法，第一种写法是：
* module.exports=function (content){
    return content;
}
* */

//这是第二种写法，一般来说都是写这样的写法写的多一点
module.exports=function (content,map,meta){
    /*
    * 第一个参数：err代表是否有错误
    * 第二个参数：content表示处理后的内容
    * 第三个参数：source-map 继续传递source-map
    * 第四个参数：meta给下一个loader传递参数
    * */
    console.log("loader2")
    this.callback(null,content,map,meta)
}
