import express from "express";
import bodyParser from "body-parser";
import sequelize from "./db/db.js";
import todoRouter from "./routes/todo.routes.js";
import cors from "cors";

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
  try {
    console.log("Connecting to SQLite...");
    await sequelize.authenticate();
    console.log("Connected!");

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
})();
