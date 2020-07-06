const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const koaBody = require('koa-body')
const Mongoose = require('mongoose')
const path = require('path')

//将dist文件暴露为公共文件
const staticFiles = require('koa-static')
app.use(staticFiles(path.resolve(__dirname, "./dist")))


//cors
const cors = require('koa2-cors')
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === 'test') {
      return false
    }
    return "*"
  },
  exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'post', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', '*']
}))
//end of cors

app.use(koaBody({
  multipart: true
}));

//koa-router
const router = new Router()
app.use(router.routes())
app.use(router.allowedMethods())


//控制器路由
const ctl = require('./controller/index')

router.post('/phl', async (ctx) => {
  const request = ctx.request.body
  let response
  console.log(request);
  for (var func in request) {
    // console.log(Array.isArray(request[func]))
    // const arrTemp = {}
    if (!Array.isArray(request[func])) {
      response = await ctl[func](request[func])
    } else {
      const arrTemp = []
      for (var args in request[func]) {

        const reslut = await ctl[func](request[func][args])
        arrTemp.push(reslut)
      }
      response = arrTemp
    }
  }
  ctx.body = response
})


//连接MongoDB
const {
  mongodbStr
} = require('./database/config')
Mongoose.connect(mongodbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('MongoDB connect successful')
})
Mongoose.connection.on('error', console.error)
//end of MongoDB



//监听端口
app.listen(8000, () => {
  console.log('run at http://localhost:8000');
});