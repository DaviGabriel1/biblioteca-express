const { DataTypes } = require("sequelize")

const db = require("../db/conn")

const Comment = require("../models/Comment")
const Order = require("../models/Order")

const User = db.define("User",{
    FirstName:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    imgUrl:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        require:true
    }
})

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = User;