const { sequelize } = require("./db");
const { User, Post } = require("./");
const users = require("./seedData");
const posts = require("./seedDataPost.json");
const bcrypt = require("bcryptjs");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db

  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hash = await bcrypt.hash(user.password, 10);
      return { username: user.username, password: hash };
    })
  );

  await User.bulkCreate(hashedUsers);
  await Post.bulkCreate(posts);

  let user = await User.findAll();
  let post = await Post.findAll();

  await user[0].addPosts([post[0], post[1]]);
  await user[1].addPosts([post[2]]);
};

module.exports = seed;
