import { createTodo } from "@/services/todo-services";
import { useState } from "react";

export default function TodoForm({ refresh }: { refresh: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = async () => {
    if (!title.trim()) return;

    await createTodo(title, description);
    setTitle("");
    setDescription("");
    refresh();
  };

  return (
    <div className="flex flex-col gap-2 my-4 w-full max-w-md">
      <input
        className="border px-2 py-1 rounded"
        placeholder="Todo title..."
        value={title}
        required
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
  );
}
