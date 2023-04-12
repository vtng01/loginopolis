const { sequelize } = require("./db");
const { User } = require("./");
const users = require("./seedData");
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
};

module.exports = seed;
