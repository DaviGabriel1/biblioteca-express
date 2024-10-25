const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("library","root","root",{
    host:"localhost",
    dialect:"mysql"
})

try{
    sequelize.authenticate();
    console.log("conectado ao mysql com sucesso")
}catch(err){
    console.log(`erro ao conectar: ${err}`)
}

module.exports = sequelize;