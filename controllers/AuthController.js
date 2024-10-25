const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class AuthController{
    static register(req,res){
        res.render("auth/register")
    }
    static login(req,res){
        res.render("auth/login")
    }
    static async registerPost(req,res){
        const {firstName, lastName, email,password,confirm_password} = req.body;
        let isAdmin = false;
        if(password !== confirm_password){
            req.flash('message','as senhas não conferem, tente novamente!')
            res.render("auth/register")
            return
        }
        else if (password.length<8){
            req.flash('message','a senha deve ter mais de 7 caracteres!')
            res.render("auth/register")
            return
        }

        const checkIfUserExist = await User.findOne({where:{email:email}});

        if(checkIfUserExist){
            req.flash('message','o usuário já está cadastrado!')
            res.render("auth/register")
            return
        }
        
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password,salt);

        const user = {
            firstName,
            lastName,
            email,
            imgUrl: null,
            password:passwordHash,
            isAdmin
        }

        try{
            const createdUser = await User.create(user)
            req.session.userid = createdUser.id

            req.flash("message","cadastro realizado com sucesso!")

            req.session.save(()=>{
                res.redirect("/")
            })
        }
        catch(err){
            console.log(`erro ao cadastrar: ${err}`)
        }        
    }
    static loginPost(req,res){
        res.redirect("/")
    }
}
