import { TodoDTO } from "@/DTOs/todo-dto";

const API_URL = "http://localhost:8080/todos";

export const getAllTodos = async (): Promise<TodoDTO[] | []> => {
  const res = await fetch(API_URL);
  const json = await res.json();

  if (!res.ok) {
    console.error(json.error);
    return [];
  }

  return json.data;
};

export const createTodo = async (title: string, description: string) => {
  if (!title.trim()) return null;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, completed: false }),
  });

  return res.json();
};

export const toggleTodo = async (todo: TodoDTO) => {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed }),
  });

  return res.json();
};

export const deleteTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
