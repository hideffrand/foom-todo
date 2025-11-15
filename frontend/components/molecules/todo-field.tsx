import { TodoDTO } from "@/DTOs/todo-dto";

export default function TodoField({ todo }: { todo?: TodoDTO }) {
  return (
    <div>
      <input type="text" placeholder="Enter todo item" />
      <button>Add Todo</button>
    </div>
  );
}
