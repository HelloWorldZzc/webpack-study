/*
* pitch会在函数执行前先调用函数
* 执行顺序类似于洋葱模型：test1，test2，test3，test4所对应pitch1，pitch2，pitch3，pitch4
* use【test1，test2，test3，test4】
* 原本是test4,3，2,1；现在成为p1 p2 p3 p4 t4 t3 t2 t1
*
* 特殊:要是pitch中使用到了return语句，那么会掉过后续的pitch与所对应test之间的全部内容
*
* 例：pitch3使用return，返回的内容为 p1 p2 p3(p4 t4 t3已经跳过)t2 t1
*
* 理解：use的执行顺序是从右往左的，pitch在正常函数之前执行，他的执行顺序是从左往右的，有点类似于一个洋葱模型
*
* */
module.exports=function (content){
    console.log("test1")
    return "content"
}
module.exports.pitch=function (){
    console.log("pitch 1")
}
