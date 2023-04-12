const express = require("express");
const app = express();
const { User, Post } = require("./db");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function login(body) {
  const { username, password } = body;

  if (!username || !password) {
    return false;
  }
  const [foundUser] = await User.findAll({ where: { username } });

  if (!foundUser) {
    return false;
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  return isMatch;
}

app.get("/", async (req, res, next) => {
  try {
    res.send(
      "<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>"
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const hash = await bcrypt.hash(password, 5);
      await User.create({ username: username, password: hash });
      res.send(`successfully created user ${username}`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
app.post("/login", async (req, res, next) => {
  try {
    const isMatch = await login(req.body);

    if (isMatch) {
      const { username } = req.body;
      res.send(`successfully logged in user ${username}`);
    } else {
      res.status(401).send("incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/me", async (req, res, next) => {
  try {
    const isMatch = await login(req.body);
    if (isMatch) {
      const { username } = req.body;
      const [user] = await User.findAll({ raw: true, where: { username } });
      const posts = await Post.findAll({ where: { userId: user.id } });
      res.send(posts);
    } else {
      res.status(401).send("incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
