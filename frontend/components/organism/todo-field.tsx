"use client";

import { TodoDTO } from "@/DTOs/todo-dto";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

export default function TodoField({ todo }: { todo: TodoDTO }) {
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleToggleTodo = async (todo: TodoDTO) => {
    await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    // fetchTodos();
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    // fetchTodos();
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
    // fetchTodos();
  };

  const startEdit = (todo: TodoDTO) => {
    setEditMode(true);
    setEditTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  return (
    <div
      key={todo.id}
      className={`flex justify-between items-center ${
        todo.completed ? "bg-green-100" : "bg-gray-50"
      } p-4 rounded`}
    >
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo)}
          className="accent-green-600 scale-150"
        />

        {editMode && editTodoId === todo.id ? (
          <div className="flex flex-col">
            <input
              className="border px-2 py-1 rounded font-semibold"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="border px-2 py-1 rounded mt-1"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded"
                onClick={saveEdit}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-400 text-white rounded"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3
              className={`font-semibold ${
                todo.completed ? "line-through text-green-700" : ""
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm opacity-80">{todo.description}</p>
            )}
          </div>
        )}
      </div>

      {!editMode && (
        <div className="flex gap-4 items-center">
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
            onClick={() => startEdit(todo)}
          >
            <FiEdit size={20} /> Edit
          </button>

          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <TiDeleteOutline size={20} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
