const UserCtl = require('./user')
const upload = require('./upload')


module.exports = {
    findUser: UserCtl.findUser,
    findUserList: UserCtl.findUserList,
    login: UserCtl.login,
    update: UserCtl.update,
    createUser: UserCtl.createUser,
    upload: upload.upload,
    hello: upload.hello

}