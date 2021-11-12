const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define('users',{    
    email:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false,  
        unique:true      
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false
    },
    username:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false,
        unique:true      

    },
    token: { 
        type:Sequelize.DataTypes.STRING
     }    
},{
    timestamps:false
})

module.exports = User