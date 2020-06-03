const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const path = require('path')

const staticFiles = require('koa-static')

app.use(staticFiles(path.resolve(__dirname, "./dist")))



//导入 cors
const cors = require('koa2-cors')
app.use(cors({
    origin: (ctx) => {
        if(ctx.url === 'test'){
            return false
        }
        return "*"
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
//end of cors

app.use(koaBody())




//连接MongoDB
const Mongoose =require('mongoose')
const { mongodbStr } = require('./schema/user/DB_login_cfg')
Mongoose.connect(mongodbStr, { useNewUrlParser: true,  useUnifiedTopology: true  }, () => {
    console.log('MongoDB connect successful')
})
Mongoose.connection.on('error', console.error)
//end of MongoDB


const Router = require('koa-router')
const route = new Router()
app.use(route.routes()).use(route.allowedMethods())

route.get('/', async (ctx) => {
    ctx.body = 'hello world'
})


const UsersCtl = require('./test/index')

route.post('/phl', async (ctx) => {
  const request = ctx.request.body
   let answer = request
   for( var func in request ) {
     console.log(Array.isArray(request[func]))
      if(!Array.isArray(request[func])){
        answer[func] =  await UsersCtl[func](request[func])
      } else{
          const arrTemp = []
          for(var args in request[func]){

            console.log(request[func][args])
            const user =  await UsersCtl[func](request[func][args])
            arrTemp.push(user)
          }
        answer[func] = arrTemp  
      }
   
  
      // for(var value in request[key])  
  //   console.log(typeof(request[key]));
    
    
    ctx.body = answer
   }
})

const iphl = require('./dist/index')
route.get('/iphl', (ctx) => {
  ctx.body = iphl
})

route.post('/test', async (ctx) => {
  ctx.body = 'hello world'
})


//Apollo服务
// const schema = require('./schema/index.js')

// const server = new ApolloServer({ 
//     schema,
//     context: ({ ctx }) => {

//     }
// })

// server.applyMiddleware({ app })
// //end of Apollo



//监听端口
app.listen({port: 8000}, () => {
    console.log(`server ready at http://localhost:8000`)
})