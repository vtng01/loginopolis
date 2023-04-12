const app = require("./index");
const { sequelize } = require("./db");
const seed = require("./db/seedFn");

const { PORT = 4000 } = process.env;

app.listen(PORT, async () => {
  sequelize.sync({ force: false });
  await seed();
  console.log(`Users are ready at http://localhost:${PORT}`);
});
