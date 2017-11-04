// console.log(this);
// console.log(exports);
// console.log(module.exports);

//export 被强行覆盖
exports = 10;

/*
export可以被覆盖，但是当被覆盖是，exports就无法导出模块。
只能用module.exports导出
*/
module.exports = {
  name:"lisi"
};
