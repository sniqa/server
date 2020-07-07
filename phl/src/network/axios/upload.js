import axios from 'axios'

function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:9000/ipl',
    method: 'post',
    timeout: 15000,
    // data: config,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/octet-stream',
    }
  })
  // axios.defaults.headers.common['Authorization'] = token;
  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
  }, err => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response.data;
  }, err => {
    // 对响应错误做点什么
    return Promise.reject(err);
  });


  return instance(config)
}

function BinaryToString (binary) {
  var error;

  try {
    return decodeURIComponent(escape(binary));
  } catch (_error) {
    error = _error;
    if (error instanceof URIError) {
      return binary;
    } else {
      throw error;
    }
  }
}

function ArrayBufferToString (buffer) {
  return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
}

/*  使用dataURL格式传输数据*/
// export function upload (file) {
//   const reader = new FileReader()
//   reader.readAsDataURL(file)
//   reader.onloadend = (e) => {
//     const data = e.target.result
//     let str = 'data:' + file.type + ';base64,'
//     let buffer = data.substring(str.length)
//     return request({
//       data: {
//         upload: {
//           'file': buffer,
//           'filename': file.name,
//           'filesize': file.size
//         }
//       }
//     })
//   }

// }

/*  使用arraybuffer 传输*/
export function upload (file) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = (e) => {
    const data = e.target.result
    const buffer = new Uint8Array(data)
    const buffer1 = String.fromCharCode.apply(null, Array.prototype.slice.apply(buffer))
    const buffer2 = BinaryToString(buffer1)
    console.log(buffer2);

    return request({
      data: {
        upload: {
          'file': buffer2,
          'filename': file.name,
          'filesize': file.size
        }
      }
    })
  }

}

// export function upload (file) {

//   if (!window.FileReader) {
//     return "Not supported by your browser!"
//   }

//   let filename = file.name
//   let filesize = file.size
//   let filetype = file.type
//   var reader = new FileReader()

//   // 文件切片

//   let curPage = 0
//   let buf = 1024 * 1024
//   let curLoaded = 0


//   while (curPage * buf < filesize) {
//     readBlob(file, curPage, buf)
//     curPage += 1
//   }



//   function readBlob (file, curPage, pageSize) {
//     let start = pageSize * curPage
//     let blob = file.slice(start, start + pageSize);
//     // console.log(blob);
//     console.log(curPage)
//     // reader.readAsDataURL(blob);

//     reader.onload = (e) => {
//       // let str = 'data:application/octet-stream;base64,'
//       // let buffer = e.target.result.substring(str.length)


//       return request({
//         data: {
//           upload: {
//             'file': buffer,
//             'filename': file.name,
//             'filesize': file.size,
//             'filetype': file.type,
//             'curPage': curPage
//           }
//         }
//       })
//     };
//   }
// }

export function test (msg) {
  request({
    data: {
      hello: {
        'msg': msg
      }
    }
  })
}

// export function login (username, password) {
//   return request({
//     data: {
//       login: {
//         'username': username,
//         'password': password
//       }
//     }
//   })
// }