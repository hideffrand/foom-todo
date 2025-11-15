const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db/db");
const todoRouter = require("./routes/todo.routes");
const cors = require("cors");
const PORT = 8080;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());
app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

(async () => {
  console.log("Connecting to SQLite...");
  await sequelize.authenticate();
  console.log("Connected!");

  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
})();
