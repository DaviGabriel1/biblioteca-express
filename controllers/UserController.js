const User = require("../models/User")

module.exports = class UserController{
    static async showUser(req,res){

        res.render("user/user")
    }
}