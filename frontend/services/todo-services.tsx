import { TodoDTO } from "@/DTOs/todo-dto";

const API_URL = "http://localhost:8080/todos";

export const getAllTodos = async (): Promise<TodoDTO[] | []> => {
  const res = await fetch(API_URL);
  const json = await res.json();

  if (!res.ok) {
    alert("Failed to get todo(s).");
    console.log(json.error);
    return [];
  }

  return json.data;
};

export const createTodo = async (title: string, description: string) => {
  if (!title.trim()) return null;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      completed: false,
    }),
  });
  const json = await res.json();

  if (!res.ok) {
    console.error(json.error);
    alert("Failed to create todo.");
    return false;
  }

  return true;
};

export const editTodoStatus = async (todo: TodoDTO) => {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed }),
  });
  const json = await res.json();

  if (!res.ok) {
    console.error(json.error);
    alert("Failed to edit todo.");
    return false;
  }

  return true;
};

export const editTodoContent = async (
  id: number,
  title: string,
  description: string
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  });
  const json = await res.json();

  if (!res.ok) {
    console.error(json.error);
    alert("Failed to edit todo.");
    return false;
  }

  return res.json();
};

export const deleteTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();

  if (!res.ok) {
    console.error(json.error);
    alert("Failed to delete todo.");
    return false;
  }

  return true;
};
