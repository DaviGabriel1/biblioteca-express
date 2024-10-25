const express = require("express")
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/register",AuthController.register)
router.get("/login",AuthController.login)
router.post("/register",AuthController.registerPost)
router.post("/login",AuthController.loginPost)

module.exports = router;
