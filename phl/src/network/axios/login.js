import axios from 'axios'

function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:9000',
    method: 'post',
    timeout: 5000,
    // data: config,
    headers: {
      'Content-Type': 'application/json'
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



export function login (username, password) {
  return request({
    data: {
      login: {
        'username': username,
        'password': password
      }
    }
  })
}

export function findUser (username) {
  return request({
    data: {
      findUser: {
        'username': username
      }
    }
  })
}

export function create (username, password) {
  return request({
    data: {
      createUser: {
        'username': username,
        'password': password
      }
    }
  })
}