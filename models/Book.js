const { DataTypes } = require("sequelize")

const db = require("../db/conn")

const Order = require("../models/Order")
const Comment = require("../models/Comment")

const Book = db.define("Book",{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        require:true
    },
    imgUrl:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    pageQty:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    genre:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    
})


Book.hasMany(Order)
Order.belongsTo(Book)

Book.hasMany(Comment)
Comment.belongsTo(Book)


module.exports = Book;