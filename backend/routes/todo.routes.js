const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");

// GET /todos
router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.json({ data: todos, message: "Todos retrieved successfully" });
});

// GET /todos/:id
router.get("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ data: todo, message: "Todo retrieved successfully" });
});

// POST /todos
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.errors?.[0]?.message });
  }
});

// PUT /todos/:id
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  try {
    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.errors?.[0]?.message });
  }
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  await todo.destroy();
  res.sendStatus(204);
});

module.exports = router;
