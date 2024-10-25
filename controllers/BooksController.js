const Book = require("../models/Book")
module.exports = class BooksController{

    static async showBooks(req,res){
        const books = await Book.findAll({raw:true})
        res.render("books/home",{books})
    }
}
