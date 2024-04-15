const users=require('./userDB')

function getSingleUser(userId){
    const selectedUser=users.filter((user)=>user.id===userId)
    return selectedUser
}

module.exports = {getSingleUser}