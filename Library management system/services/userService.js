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

    getUser(users, userId) {
        let user = users.find((user) => user.getUserId() == userId);
        if (user) {
            return user;
        }
        else {
            throw "Invalid User Id";        // extra error added;
        }
    }
    
}

module.exports = {
    "getInst":()=>{
        return new UserService();
    }
}