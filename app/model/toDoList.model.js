const Sequelize = require('sequelize')
const db = require('../config/db')

const List = db.define('toDoLists',{
    task_name:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false,
    },
    description:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false,
    },
    priority:{
        type:Sequelize.DataTypes.STRING,
        require:true,
        allowNull:false,
    },
    status:{
        type:Sequelize.DataTypes.BOOLEAN,
        require:true,
        allowNull:false
    },
    date_of_creation:{
        type:'TIMESTAMP',
        require:true,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    due_date:{
        type:Sequelize.DataTypes.DATE,
        require:true,
        allowNull:false
    }    
},{
    timestamps:false
})

module.exports = List