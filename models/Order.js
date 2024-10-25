const { DataTypes } = require("sequelize")

const db = require("../db/conn")

const Order = db.define("Order", {
    rental_date:{
        type:DataTypes.DATE,
        require:true,
        allowNull:false
    },
    return_date:{
        type:DataTypes.DATE,
        require:true,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('rental', 'returned', 'late'),
        require:true,
        allowNull:false
    },

})


module.exports = Order

