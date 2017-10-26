var EventEmitter = require("events");

var eventOne = new EventEmitter();

//注册多个事件
eventOne.on("custom_event_2",function(value){
  console.log("触发2: ",value);
});

//一个事件可以添加多个回调函数
var handler = function(value){
  console.log("触发1111：",value);
}

eventOne.on("custom_event_1",handler);

eventOne.on("custom_event_1",function(value){
  console.log("触发1:",value);

  //事件回调函数的内部this === eventOne
  //移除一个回调函数
  // console.log("this:",this);
  this.removeListener("custom_event_1",handler);
});

setTimeout(function(){
  // eventOne.removeAllListeners("custom_event_1");//移除事件所有函数
  // eventOne.removeAllListeners();//移除所有的事件以及所有的函数


  eventOne.emit("custom_event_1",Math.floor(Math.random()* 10 + 10));
  eventOne.emit("custom_event_2",Math.floor(Math.random()* 10 + 10));
  eventOne.emit("custom_event_1",Math.floor(Math.random()* 10 + 10));

},2000);
