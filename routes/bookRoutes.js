const express = require("express")
const router = express.Router()
const BooksController = require("../controllers/BooksController")

router.get("/",BooksController.showBooks)
//router.get("/book/:id",BooksController.showOnlyBook)

module.exports = router;