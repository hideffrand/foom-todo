import express from "express";
import * as todoService from "../services/todo.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await todoService.getAllTodos();
  res.json({ data: todos, message: "Todos retrieved successfully" });
});

router.get("/:id", async (req, res) => {
  const todo = await todoService.getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  res.json({ data: todo, message: "Todo retrieved successfully" });
});

router.post("/", async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.errors?.[0]?.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.errors?.[0]?.message });
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await todoService.deleteTodo(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Todo not found" });

  res.sendStatus(204);
});

export default router;
