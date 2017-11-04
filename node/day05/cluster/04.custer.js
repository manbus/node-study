var os = require('os');
var cluster = require('cluster');
var workers = [];

if (cluster.isMaster){
  for (var i = 0,n = os.cpus().length; i < n; i++){
    var worker = cluster.fork();

    //worker.id 和 worker.process.pid不一样
    console.log(`worker.process.pid = ${worker.process.pid}`);
    console.log(`worker.id = ${worker.id}`);
    workers.push(worker);
  };

  setTimeout(()=>{
    workers.forEach((e,i,a)=>{
      //主进程给每一个子进程发送一条消息
      e.send(`${e.process.pid} 开始干活`);
    });
  },5000);
} else {
  //子进程接收发来的信息
  process.on("message",function(mesg){
    console.log("收到信息",mesg);
  });

  setInterval(()=>{
    console.log(`${process.pid} 进程输出`);
  },2000);
}
