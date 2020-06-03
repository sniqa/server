const User = require('../schema/user/mongoSchema')

const jsonwebtoken = require('jsonwebtoken')

const { secret } = require('../schema/user/DB_login_cfg')

class UsersCtl {
    async findUserList(obj){

        // const { per_page = 10 } = ctx.query
        // const page = Math.max(ctx.query.page * 1) - 1
        // const perPage = Math.max(per_page * 1, 1) 
        return await User.find()
      
    }

    async findUser(obj){

        // const { per_page = 10 } = ctx.query
        // const page = Math.max(ctx.query.page * 1) - 1
        // const perPage = Math.max(per_page * 1, 1) 
        return await User.findOne(obj)
      
    }

    async createUser(obj){
       
        const { username } = obj
        const repeatedUser = await User.findOne({ username})
        if(repeatedUser) { return "The User has already exist" } 
        const newUser = await new User(obj).save()
        return newUser
    }

    async login(obj){
        
        // const { username } = args
        const user = await User.findOne(obj)
        if(!user){ return null }
        const { _id, username } = user
        const token = jsonwebtoken.sign({ _id, username}, secret, {expiresIn: '1d'})
        const id = _id
        return { id, token }
    }

    async update(obj){
        let decode
        const { token, mutationData } = obj 
        try{
            decode = jsonwebtoken.verify(token, secret)
        }catch(err){
            return err
        }
        const { username } = decode
        const user = await User.findOne({ username })
        console.log(mutationData);
        
        if( !user ) { return "The User has already exist" }
         const newuser = await User.updateOne(user,  mutationData  )
        // if(!user) { ctx.throw(404, 'user not found') }
        return newuser;
    }









    // async findById(ctx){
    //     const { fields = '' } = ctx.query
    //     const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    //     const user = await User.findById(ctx.params.id).select(selectFields)
    //     if(!user){
    //         ctx.throw(404, 'Not Found')
    //     }
    //     ctx.body = user
    // }
    // // async create(ctx){
    // //     ctx.verifyParams({
    // //         name: { type: "string", required: true },
    // //         passwd: { type: "string", required: true }
    // //     })
    // //     const { name } = ctx.request.body
    // //     const repeatedUser = await User.findOne({ name })
    // //     if(repeatedUser) { ctx.throw(409, '用户已存在')} 
    // //     const newUser = await new User(ctx.request.body).save()
    // //     ctx.body = newUser.name
    // // }
    // // async update(ctx){
    // //     ctx.verifyParams({
    // //         name: { type: "string", required: false },
    // //         passwd: { type: "string", required: false }
    // //     })
    // //     const { name } = ctx.request.body
    // //     // const repeatedUser = await User.findOne({ name })
    // //     if( name ) { ctx.throw(401, '不允许') }
    // //     const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    // //     if(!user) { ctx.throw(404, 'user not found') }
    // //     ctx.body = user;
    // // }
    // async delete(ctx){
    //     const user = await User.findByIdAndRemove(ctx.params.id)
    //     if(!user){ ctx.throw(404, 'user not found') }
    //     ctx.status = 204
    // }
    // // async login(ctx){
    // //     ctx.verifyParams({
    // //         name: { type: "string", required: true},
    // //         passwd: { type: "string", required: true}
    // //     })
        
    // //     const user = await User.findOne(ctx.request.body)
    // //     if(!user){ ctx.throw(401, '用户或密码不正确') }
    // //     const { _id, name } = user
    // //     const token = jsonwebtoken.sign({ _id, name}, secret, {expiresIn: '1d'})
    // //     ctx.body = { _id, token }
    // // }
    // async checkOwner(ctx, next){
    //     if(ctx.params.id !== ctx.state.user._id){ ctx.throwa(401, '无权限')}
    //     await next()
    // }
    // async checkUserExist(ctx, next){
    //     const user = await User.findById(ctx.params.id)
    //     if(!user){ ctx.throw(404, '用户不存在')}
    //     await next()
    // }
    // async followingList(ctx){
    //     const user = await User.findById(ctx.params.id).select('+following').populate('following')
    //     if(!user){ ctx.throw(404) }
    //     ctx.body = user.following
    // }
    // async follow(ctx){
    //     const mine = await User.findById(ctx.state.user._id).select('+following')
    //     if(!mine.following.map(id => id.toString()).includes(ctx.params.id)){
    //         mine.following.push(ctx.params.id)
    //         mine.save()
    //     }
    //     ctx.status = 204
    // }
    // async unfollow(ctx){
    //     const mine = await User.findById(ctx.state.user._id).select('+following')
    //     const index = mine.following.map(id => id.toString()).indexOf(ctx.params.id)
    //     if(index > -1){
    //         mine.following.splice(index, 1)
    //         mine.save()
    //     }
    //     ctx.status = 204
    // }
    // async followersList(ctx){
    //     ctx.body = await User.find({ following: ctx.params.id })
    // }
    // async followTopic(ctx){
    //     const mine = await User.findById(ctx.state.user._id).select('+followingTopic')
    //     if(!mine.followingTopic.map(id => id.toString()).includes(ctx.params.id)){
    //         mine.followingTopic.push(ctx.params.id)
    //         mine.save()
    //     }
    //     ctx.status = 204
    // }
    // async unfollowTopic(ctx){
    //     const mine = await User.findById(ctx.state.user._id).select('+followingTopic')
    //     const index = mine.followingTopic.map(id => id.toString()).indexOf(ctx.params.id)
    //     if(index > -1){
    //         mine.followingTopic.splice(index, 1)
    //         mine.save()
    //     }
    //     ctx.status = 204
    // }
    // async topicFollowingList(ctx){
    //     const user = await User.findById(ctx.params.id).select('+followingTopic').populate('followingTopic')
    //     if(!user){ ctx.throw(404) }
    //     ctx.body = user.followingTopic
    // }
    // async topicFollowersList(ctx){
    //     ctx.body = await User.find({ followingTopic: ctx.params.id })
    // }
}

module.exports = new UsersCtl()