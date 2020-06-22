const Koa = require('koa')

const path = require('path')
const cors = require('koa2-cors')
const Mongoose = require('mongoose')
const Router = require('koa-router')

const app = new Koa()
const staticFiles = require('koa-static')




app.use(staticFiles(path.resolve(__dirname, "./dist")))





//导入 cors
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === 'test') {
      return "*"
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




/**********  使用路由 ********/
const route = new Router()
app.use(route.routes()).use(route.allowedMethods())

//连接MongoDB
const {
  mongodbStr
} = require('./schema/user/DB_login_cfg')
Mongoose.connect(mongodbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('MongoDB connect successful')
})
Mongoose.connection.on('error', console.error)
//end of MongoDB



route.post('/upload', async (ctx) => {
  console.log(ctx.req.files)
})



route.get('/', async (ctx) => {
  ctx.body = 'hello world'
})


/*************** ipl ************/
const UsersCtl = require('./test/index')

route.post('/phl', async (ctx) => {
  const request = ctx.request.body
  let response = request
  for (var func in request) {
    // console.log(Array.isArray(request[func]))
    if (!Array.isArray(request[func])) {
      response[func] = await UsersCtl[func](request[func])
    } else {
      const arrTemp = []
      for (var args in request[func]) {

        console.log(request[func][args])
        const user = await UsersCtl[func](request[func][args])
        arrTemp.push(user)
      }
      response[func] = arrTemp
    }


    // for(var value in request[key])  
    //   console.log(typeof(request[key]));


    ctx.body = response[func]
  }
})

const iphl = require('./dist/index')
route.get('/iphl', (ctx) => {
  ctx.body = iphl
})

route.post('/test', async (ctx) => {
  ctx.body = 'hello world'
})








//监听端口
app.listen({
  port: 8000
}, () => {
  console.log(`server ready at http://localhost:8000`)
})