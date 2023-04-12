const { Sequelize, sequelize } = require("./db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = { User };
