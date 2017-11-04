
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
  var myURL = url.parse(req.url,true);

  if(myURL.pathname === "/"){
    fs.readFile("./index.html",'utf8',function(err,data){
      if(!err){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
      } else {
        res.writeHead(500, {"Content-Type":"text/html"});
        res.end("<h1>server inner error!</h1>");
      }
    });
  } else if (myURL.pathname === "/students" && req.method === 'GET'){
    fs.readFile("./stus.json","utf8",function(err,data){
      if(!err){
        var limit = myURL.query.limit;//得到前端请求的数据的个数
        console.log("limit = ",limit);

        var temp = (JSON.parse(data)["stus"]).slice(0,limit);
        console.log("temp = ",temp);
        console.log("typeof temp",typeof temp);


        //给前端发送一个对象格式的字符串最合适
        var str = JSON.stringify({data:temp});
        console.log("str = ",str);
        console.log("typeof str",typeof str);

        //res要发送的数据必须是string 或者是 buffer (16进制)
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(str);
      } else {
        res.writeHead(500,{"Conten-Type":"text/html"});
        res.end("<h1>server inner err! </h1>");
      }
    });
  } else if (myURL.pathname === "/js/jquery.min.js" && req.method === 'GET'){
    fs.readFile("./js/jquery.min.js",'utf8',function(err,data){
      if(!err){
        res.writeHead(200,{"Content-Type":"text/script"});
        res.end(data);
      } else {
        res.writeHead(500,{"Content-Type":"text/html"});
        res.end("<h1>jquery inner error!</h1>")
      };
    });
  } else {
    res.writeHead(404,{"Content-type":"text/html"});
    res.end("<h1>not found!</h1>")
  }
}).listen(8000,function(){
  console.log("正在监听 8000...");
});
