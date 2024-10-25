const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")

const checkAuth = require("../helpers/auth").checkAuth;

router.get("/user",checkAuth,UserController.showUser)

module.exports = router;