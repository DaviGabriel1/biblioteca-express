const { DataTypes } = require("sequelize")

const db = require("../db/conn")

const Comment = db.define("Comment",{
    text:{
        type:DataTypes.TEXT,
        require:true,
        allowNull:false
    },
    date_comment:{
        type:DataTypes.DATE,
        require:true,
        allowNull:false
    },
    rating:{
        type:DataTypes.SMALLINT,
        require:true,
        allowNull:false
    }
})

module.exports = Comment