import { useQuery } from "@tanstack/react-query";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://69e4bb98cfa9394db8da54e6.mockapi.io/todo";

// -- Custom hook --------------------------------------
export default function useTodo() {
  const { isPending, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });

  return { isPending, data, error };
}

// -- add item --------------------------------------
export async function addTodoItem(newTodo) {
  const refactoredTodo = {
    ...newTodo,
    dueDate: newTodo.dueDate === "" ? "No due date" : newTodo.dueDate,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refactoredTodo),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo item");
  }

  return res.json();
}

// -- Delete item --------------------------------------
export async function deleteTodoItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo item");
  }
}

export async function updateStatus(todo) {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !todo.completed }),
  });
  if (!res.ok) {
    throw new Error("Failed to update status");
  }
}

// -- helper fn ----------------------------------------
async function fetchTodo() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return await res.json();
}
