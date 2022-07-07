//raw loader接受到的content是一个buffer数据(二进制)，一般我们在处理音频，图片等信息时会使用到

module.exports=function (content){
    console.log(content)
    return content
}
//表示这是一个raw loader
module.exports.raw=true;

//raw loader还有一种写法
// function test(content){
//     return content
// }
// test.raw=true;
// module.exports=test()
