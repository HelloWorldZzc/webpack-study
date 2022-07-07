//这个插件用于清除文件的console.log(xxx)
module.exports=function (content){
    return content.replace(/console\.log\(.*\);?/g,"")
}
