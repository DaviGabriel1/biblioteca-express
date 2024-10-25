const express = require("express")
const { engine } = require("express-handlebars")
const session = require('express-session')
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const app = express();

const porta = process.env.PORT || 3000;

const conn = require("./db/conn");

conn.sync().then(() => {
    app.listen(porta,() => {console.log(`servidor rodando na porta ${porta}...`)})
}).catch((err) => console.log(err))