"use client";

import { TodoDTO } from "@/DTOs/todo-dto";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { createTodo, getAllTodos } from "@/services/todo-services";
import TodoField from "@/components/organism/todo-field";

export default function Home() {
  const [todos, setTodos] = useState<TodoDTO[] | []>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTodos = async () => {
    const res = await getAllTodos();
    setTodos(res);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (!title.trim()) return;

    const res = await createTodo(title, description);
    setTitle("");
    setDescription("");
    fetchTodos();
  };

  const handleToggleTodo = async (todo: TodoDTO) => {
    await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    fetchTodos();
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  const startEdit = (todo: TodoDTO) => {
    setEditMode(true);
    setEditTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const saveEdit = async () => {
    if (!editTodoId) return;

    await fetch(`http://localhost:8080/todos/${editTodoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    });

    setEditMode(false);
    setEditTodoId(null);
    fetchTodos();
  };

  return (
    <main className="flex flex-col items-center mt-12 min-h-screen p-4 w-full">
      <p className="text-xl font-bold">Todo List</p>

      <div className="flex flex-col gap-2 my-4 w-full max-w-md">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border px-2 py-1 rounded"
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleCreateTodo}
        >
          + Add Todo
        </button>
      </div>

      <div className="flex flex-col gap-3 w-md">
        {todos.length === 0 ? (
          <p>No todos available</p>
        ) : (
          todos?.map((todo) => <TodoField key={todo.id} todo={todo} />)
        )}
      </div>
    </main>
  );
}
