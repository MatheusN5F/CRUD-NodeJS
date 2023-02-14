const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'postgres', 'matheus1k', {
    host: 'localhost',
    dialect: 'postgresql',
    query: {raw:true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}