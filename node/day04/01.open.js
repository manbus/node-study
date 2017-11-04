var fs = require("fs");

while(true){
  var fd = fs.openSync("./hello.txt","w");
  console.log("fd = ",fd);
  fs.closeSync(fd)
}
