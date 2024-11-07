const Book = require("../models/Book")
module.exports = class BooksController{

    static async showBooks(req,res){
        const books = await Book.findAll({raw:true})
        res.render("books/home",{books})
    }

    static async showOnlyBook(req,res){
        //const id =req.params.id;
        //const book = await Book.findOne({where:{id:id},plain:true,raw:true})
        //res.render("book")
    }

    
}
