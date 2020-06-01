const Sequelize = require('sequelize');

const sequelize = new Sequelize('sc_oeste_ti', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize