const path = require('path')
const fs = require('fs')

function StringToBinary (string) {
  var chars, code, i, isUCS2, len, _i;

  len = string.length;
  chars = [];
  isUCS2 = false;
  for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
    code = String.prototype.charCodeAt.call(string, i);
    if (code > 255) {
      isUCS2 = true;
      chars = null;
      break;
    } else {
      chars.push(code);
    }
  }
  if (isUCS2 === true) {
    return unescape(encodeURIComponent(string));
  } else {
    return String.fromCharCode.apply(null, Array.prototype.slice.apply(chars));
  }
}

function StringToUint8Array (string) {
  var binary, binLen, buffer, chars, i, _i;
  binary = StringToBinary(string);
  binLen = binary.length;
  buffer = new ArrayBuffer(binLen);
  chars = new Uint8Array(buffer);
  for (i = _i = 0; 0 <= binLen ? _i < binLen : _i > binLen; i = 0 <= binLen ? ++_i : --_i) {
    chars[i] = String.prototype.charCodeAt.call(binary, i);
  }
  return chars;
}

function StringToArrayBuffer (string) {
  return StringToUint8Array(string).buffer;
}

class uploadCtl {


  /*  使用DataUrl 数据格式传输  */
  async upload (fileobj) {

    const { filedata, filename, filesize } = fileobj

    const filepath = path.join(__dirname, '../public', filename)

    var dataBuffer = new Buffer.from(filedata, 'base64')

    fs.writeFile(filepath, dataBuffer, (error) => {
      if (error) {
        console.log('写入失败')
      } else {
        console.log('写入成功了')
      }
    })
    return 'success'
  }



  /* router.post('/file/upload', upload.single('file'), async (ctx, next) => {
  console.log('file upload...')
  // 根据文件hash创建文件夹，把默认上传的文件移动当前hash文件夹下。方便后续文件合并。
  const {
    name,
    total,
    index,
    size,
    hash
  } = ctx.req.body;

  const chunksPath = path.join(uploadPath, hash, '/');
  if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
  fs.renameSync(ctx.req.file.path, chunksPath + hash + '-' + index);
  ctx.status = 200;
  ctx.res.end('Success');
})

router.post('/file/merge_chunks', async (ctx, next) => {
  const {
    size,
    name,
    total,
    hash
  } = ctx.request.body;
  // 根据hash值，获取分片文件。
  // 创建存储文件
  // 合并
  const uploadPath = path.join(__dirname, 'uploads');

  const chunksPath = path.join(uploadPath, hash, '/');
  const filePath = path.join(uploadPath, name);
  // 读取所有的chunks 文件名存放在数组中
  const chunks = fs.readdirSync(chunksPath);
  // 创建存储文件
  fs.writeFileSync(filePath, '');
  if (chunks.length !== total || chunks.length === 0) {
    ctx.status = 200;
    ctx.res.end('切片文件数量不符合');
    return;
  }
  for (let i = 0; i < total; i++) {
    // 追加写入到文件中
    fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' + i));
    // 删除本次使用的chunk    
    fs.unlinkSync(chunksPath + hash + '-' + i);
  }
  fs.rmdirSync(chunksPath);
  // 文件合并成功，可以把文件信息进行入库。
  ctx.status = 200;
  ctx.res.end('合并成功');
}) */

  async hello (obj) {
    console.log(obj)
    return obj
  }
}

module.exports = new uploadCtl()