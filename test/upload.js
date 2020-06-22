const path = require('path');
const fs = require('fs');


const uploadimg = (ctx) => {
  let remotefilePath = null
  console.log(ctx.request.files['file'])
  if (ctx.request.files['file']) {
    // 创建可读流
    const reader = fs.createReadStream(ctx.request.files['file']['path']);
    console.log(ctx.request.files['file']['path'])
    let filePath = `${path.resolve(__dirname, '../pulic/upload')}/${ctx.request.files['file']['name']}`;
    remotefilePath = `http://yourServerHostAndPath/images/${ctx.request.files['file']['name']}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  return remotefilePath;
}

module.exports = uploadimg;