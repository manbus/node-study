
//引入一个事件模块
var EventEmitter = require("events");

//创建事件发射对象
var eventOne = new EventEmitter();

//事件注册
eventOne.on('custom_event',function(obj){
  console.log("自定义事件被触发了。。。",obj);
});

setTimeout(function(){
  //触发 自定义事件，并且传递函数
  eventOne.emit("custom_event",{velue:100});
},1000);
