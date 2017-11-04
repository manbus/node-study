var http = require("http");
var fs = require("fs");
var url = require("url");

//将后缀名和 文件的 类型名称对应

var obj = {
  "css":"text/css",
  "jpg":"image/jpeg",
  "png":"image/png",
  "js":"text/javascript"
};

//http://xxx.xxx.xxx/css/test.css
//http://xxx.xxx.xxx/js/test.js
//http://xxx.xxx.xxx/img/test.img

http.createServer(function(req,res){
  var myURL = url.parse(req.url);
  var pathname = myURL.pathname;
  var postfix,filename,codeType,dir;

  //从 pathname 中提取 后缀名 和文件名
  console.log("pathname = ",pathname);
  console.log("pathname.lastIndexOf('/')",pathname.lastIndexOf("/"));
  filename = pathname.slice(pathname.lastIndexOf("/") + 1);
  console.log("filename = ",filename);
  postfix = filename.slice(filename.lastIndexOf(".") + 1);
  console.log("postfix = ",postfix);

  //图片类型比较特殊，需要用base64编码格式
  codeType = (postfix === "jpg" || postfix === "png") ? "base64" : "utf8";
  console.log("codeType = ",codeType);
  //图片路径为img ，所以需要指定
  dir = (postfix === 'jpg' || postfix === "png") ? "img" :postfix;
  console.log("dir = ",dir);

  //当用户直接输入ip : port ，弹出html页面
  if (pathname === '/'){
    fs.readFile(__dirname + "/static/html/index.html","utf8",function(err,data){
      if(!err){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
      } else {
        console.log(err);
        res.writeHead(500,{"Content-Type":"text/html"});
        res.end("resver inner error!");
      }
    });
  } else{
    //页面当中会加载一些资源(img , js , css)
    //根据以上的信息，对应相应的文件，按照对应的文件类型，发送给浏览器，完成了资源的加载
    fs.readFile("./static/" + dir + "/" + filename,codeType,function(err,data){
      if(!err){
        res.writeHead(200,{"Content-Type":obj[postfix]});
        //write传输图片格式，需要指定base64
        res.write(data,codeType);
        //end()结束本次通信，如果不写，那么浏览器一直处于加载中的状况
        res.end();
      } else {
        res.writeHead(500,{"Content-Type":"text/html"});
        res.end("<h1>static server inner error!</h1>");
      }
    });
  }
}).listen(8888,function(){
  console.log("正在监听 8888 。。。。");
});
