const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')

const User = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        // password: { type: GraphQLString },
        email: { type: GraphQLString },
        following: { 
            type: new GraphQLList(GraphQLString)
        },
        followingTopic: { 
            type: new GraphQLList(GraphQLString)
        },
    }
})

const inputUser = new GraphQLObjectType({
    name: 'inputuser',
    fields: {
        id: { input: GraphQLString },
        username: { input: GraphQLString },
        // password: { type: GraphQLString },
        // email: { type: GraphQLString },
        following: { 
            input: new GraphQLList(GraphQLString)
        },
        followingTopic: { 
            input: new GraphQLList(GraphQLString)
        },
    }
})

const Auth_token = new GraphQLObjectType({
    name: 'auth_token',
    fields: {
        id: { type: GraphQLString },
        token: { type: GraphQLString }
    }
})

module.exports = { User, Auth_token }