import Todo from "../models/todo.model.js";

export async function getAllTodos() {
  return await Todo.findAll();
}

export async function getTodoById(id) {
  return await Todo.findByPk(id);
}

export async function createTodo(data) {
  return await Todo.create(data);
}

export async function updateTodo(id, data) {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;

  await todo.update(data);
  return todo;
}

export async function deleteTodo(id) {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;

  await todo.destroy();
  return true;
}
