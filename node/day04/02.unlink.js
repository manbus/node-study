var fs = require("fs");

fs.unlink("./hello.txt",(err)=>{
  console.log(err);
  if(!err){
    console.log("delete OK!");
  };
});
