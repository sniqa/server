const Mongoose = require('mongoose')

const { Schema, model } = Mongoose

const userSchema = new Schema({
    __v: { type: String , select: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, select: false },
    following: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        // select: false
    },
    followingTopic: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'Topics' }],
        // select: false
    },
})

module.exports =  model('User', userSchema)
