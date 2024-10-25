const express = require("express")
const { engine } = require("express-handlebars")
const session = require('express-session')
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const app = express();

//template engine
app.engine("handlebars",engine())
app.set("view engine",'handlebars')
// receber resposta do body
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())
//session middleware
app.use(
    session({
        name:"session",
        secret:"nosso_secret",
        resave: false,
        saveUninitialized:false,
        store: new FileStore({
            logFn: function() {},
            path: require("path").join(require("os").tmpdir(),'sessions')
        }),
        cookie: {
            secure:false,
            maxAge:360000,
            expires:new Date(Date.now()+360000),
            httpOnly:true
        }
    })
)
//flash messages
app.use(flash())
//public path
app.use(express.static("public"))
// set session para resposta
app.use((req,res,next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

///////////////////////////////////////////////////////////////////////////////////////////////////////
const User = require("./models/User")
const Book = require("./models/Book")
const Order = require("./models/Order")
const Comment = require("./models/Comment")

const porta = process.env.PORT || 3000;

const conn = require("./db/conn");

//import routes
const authRoutes = require("./routes/authRoutes")
const bookRoutes = require("./routes/bookRoutes")
const userRoutes = require("./routes/userRoutes")
//rotas
app.use("/",bookRoutes)
app.use("/",authRoutes)
app.use("/",userRoutes)

/*Book.create({
    title:"1984",
    description:`Publicada originalmente em 1949, a distopia futurista 1984 é um dos romances mais influentes do século XX, um inquestionável clássico moderno. Lançada poucos meses antes da morte do autor, é uma obra magistral que ainda se impõe como uma poderosa reflexão ficcional sobre a essência nefasta de qualquer forma de poder totalitário.

                    Winston, herói de 1984 , último romance de George Orwell, vive aprisionado na engrenagem totalitária de uma sociedade completamente dominada pelo Estado, onde tudo é feito coletivamente, mas cada qual vive sozinho. Ninguém escapa à vigilância do Grande Irmão, a mais famosa personificação literária de um poder cínico e cruel ao infinito, além de vazio de sentido histórico. De fato, a ideologia do Partido dominante em Oceânia não visa nada de coisa alguma para ninguém, no presente ou no futuro. O'Brien, hierarca do Partido, é quem explica a Winston que "só nos interessa o poder em si. Nem riqueza, nem luxo, nem vida longa, nem felicidade: só o poder pelo poder, poder puro".
                    Quando foi publicada em 1949, essa assustadora distopia datada de forma arbitrária num futuro perigosamente próximo logo experimentaria um imenso sucesso de público. Seus principais ingredientes - um homem sozinho desafiando uma tremenda ditadura; sexo furtivo e libertador; horrores letais - atraíram leitores de todas as idades, à esquerda e à direita do espectro político, com maior ou menor grau de instrução. À parte isso, a escrita translúcida de George Orwell, os personagens fortes, traçados a carvão por um vigoroso desenhista de personalidades, a trama seca e crua e o tom de sátira sombria garantiram a entrada precoce de 1984 no restrito panteão dos grandes clássicos modernos.
                    
                    "O maior escritor do século XX." -  Observer
                    
                    "Obra-prima terminal de Orwell, 1984 é uma leitura absorvente e indispensável para a compreensão da história moderna." - Timothy Garton Ash,  New York Review of Books
                    
                    " A obra mais sólida e mais impressionante de Orwell." - V. S. Pritchett`,
    date:"2009-07-21",
    imgUrl:"img/Capa 1984.png",
    author:"George Orwell",
    pageQty:416,
    genre:"ficcao cientifica"
}
)*/

        //{force:true}
conn.sync().then(() => {
    app.listen(porta,() => {console.log(`servidor rodando na porta ${porta}...`)})
}).catch((err) => console.log(err))