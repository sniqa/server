const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')


const { User, Auth_token, inputUser } = require('./user/graphqlSchema')
const { findUserList, findUser, createUser,
        login, updatel } = require('./user/controller')

//GraphQL总查询表
const query = new GraphQLObjectType({
    name: 'Query',
    fields:{
        userlist:{  
            type: new GraphQLList(User),
             resolve: async () => {
                const userlist  = await findUserList()
                return userlist
            }         
        },
        getUser:{
            type: User,
            args: {
                username: { type: GraphQLString }
            },
            resolve: async (_, { username }) => {
                const user = await findUser(username)
                return user
            }
        },
        login:{
            type: Auth_token,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (_, args) => {               
                const token = await login( args )
                return token
            }
        },

    } 
})

//GraphQL总变更表
const mutation = new GraphQLObjectType({
    name: 'Matation',
    fields:{
        createUser:{
            type: User,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve: async (_, args) => {                
                const user = await createUser( args )
                return user
            }
        },
        update:{
            type: User,
            args: {
                token: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve: async (_, args) => {               
                const user = await updatel( args )
                return user
            }
        }      
    } 
})

//GraphQL总表
const schema = new GraphQLSchema({
    query,
    mutation
})


module.exports = schema
