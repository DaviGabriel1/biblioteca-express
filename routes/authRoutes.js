const express = require("express")
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/register",AuthController.register)
router.get("/login",AuthController.login)
router.post("/register",AuthController.registerPost)
router.post("/login",AuthController.loginPost)
router.post("/logout",AuthController.logout)

module.exports = router;
