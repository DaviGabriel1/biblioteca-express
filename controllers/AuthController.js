const User = require("../models/User")

module.exports = class AuthController{
    static register(req,res){
        res.render("auth/register")
    }
    static login(req,res){
        res.render("auth/login")
    }
    static registerPost(req,res){
       
        res.redirect("/")
    }
    static loginPost(req,res){
        res.redirect("/")
    }
}