const Todo = require("../models/todo.model");

async function getAllTodos() {
  return await Todo.findAll();
}

async function getTodoById(id) {
  return await Todo.findByPk(id);
}

async function createTodo(data) {
  return await Todo.create(data);
}

async function updateTodo(id, data) {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;

  await todo.update(data);
  return todo;
}

async function deleteTodo(id) {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;

  await todo.destroy();
  return true;
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
