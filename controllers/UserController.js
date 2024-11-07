const User = require("../models/User")
const Order = require("../models/Order")
const Book = require("../models/Book");

module.exports = class UserController{
    static async showUser(req,res){
        const id = req.session.userid;

        let user = await User.findOne({where:{id:id},plain:true,raw:true})
        let orders = await Order.findAll({where:{UserId:id},include:Book})
        let order = orders.map((result) => result.dataValues)
        console.log(order)
        console.log(user)
        let book = await Book.findOne({where:{id:1},plain:true,raw:true})
        console.log(book)
        
        res.render("user/user",{user,order,book})
    }
}