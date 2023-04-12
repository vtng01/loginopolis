const { Sequelize, sequelize } = require("./db");

const Post = sequelize.define("post", {
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  tags: Sequelize.STRING,
});

module.exports = { Post };
