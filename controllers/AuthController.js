const { where } = require("sequelize")
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
    static async loginPost(req,res){
        const {email, password} = req.body;
        const userLogin = await User.findOne({where: {email:email}})
        if(!userLogin){
            req.flash('message','usuário não encontrado!')
            res.render("auth/login")

            return
        }
        console.log(userLogin)
        const passwordMatch = bcrypt.compareSync(password,userLogin.password)
        if(!passwordMatch){
            req.flash('message','senha invalida!')
            res.render("auth/login")

            return
        }
        req.session.userid = userLogin.id
        
        req.flash("message","autenticação realizada com sucesso!")

        req.session.save(() => {
            res.redirect("/")
        })
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect("/")
    }
}
