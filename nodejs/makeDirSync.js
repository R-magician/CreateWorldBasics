const path = require('path');
const fs = require('fs');

function makeDirSync(dirPath){
  let items = dirPath.split(path.sep);
  for(let i  = 1;i<= items.length;i++){
    let dir = items.slice(0,i).join(path.sep)
    try {
      fs.accessSync(dir)
    } catch (e) {
      //创建文件夹
      fs.mkdirSync(dir)
    }
  }
}
makeDirSync("WebRoot\\WEB-INF\\jsp\\crm\\quickOperation");
