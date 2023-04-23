let User = require("../model/user").User;
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")


class UserService{
    constructor(){
    }
    addUser(userName){
        return User.createUser(userName);
    }

    getUser(users, userId){
       return  users.find((user)=> user.getUserId() == userId);
    }
    
}

module.exports = {
    "getInst":()=>{
        return new UserService();
    }
}