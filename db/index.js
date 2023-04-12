const { User } = require("./User");
const { Post } = require("./Post");
const { sequelize, Sequelize } = require("./db");

// Relationship
User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post,
  sequelize,
  Sequelize,
};
