const Sequelize = require('sequelize')

const db = new Sequelize('toDoList','ritesh','password',{
    host:'localhost',
    dialect:'mysql',
})

module.exports = db