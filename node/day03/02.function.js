//箭头函数的this和普通函数不一样
//函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象

var obj = {
  value:10,
  getValue: () => {
    console.log(this.value);
  },
  getValue2: function(){
    console.log(this.value);
  }
};

obj.getValue();
obj.getValue2();

console.log("/********************************************************/");

var number = 0;

function fun(){
  console.log("fun函数内部的this == ",this);

  setTimeout(()=>{
    console.log(this.number);
  },1500);

  // setTimeout(function(){
  //   console.log(this.number);
  // },1500);
}

// fun();

fun.call({number:100});
