"use client";

import { TodoDTO } from "@/DTOs/todo-dto";
import { useEffect, useState } from "react";
import { getAllTodos } from "@/services/todo-services";
import TodoField from "@/components/molecules/todo-field";
import TodoForm from "./todo-form";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoDTO[] | []>([]);
  const fetchTodos = async () => {
    const res = await getAllTodos();
    setTodos(res);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="flex flex-col items-center mt-12 min-h-screen p-4 w-full">
      <p className="text-xl font-bold">Todo List</p>

      <TodoForm refresh={fetchTodos} />

      <div className="flex flex-col gap-3 w-md">
        {todos.length === 0 ? (
          <p className="text-center">You have nothing to do. Create one!</p>
        ) : (
          todos?.map((todo) => (
            <TodoField key={todo.id} todo={todo} refresh={fetchTodos} />
          ))
        )}
      </div>
    </main>
  );
}
