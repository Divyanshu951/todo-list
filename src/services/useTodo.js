import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://69e4bb98cfa9394db8da54e6.mockapi.io/todo";

// -- Custom hook for fetching todo items --------------------------------------
export function useGetTodo() {
  const { isPending, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });

  return { isPending, data, error };
}

async function fetchTodo() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return await res.json();
}

// -- Custom hook for adding item --------------------------------------
export function useAddTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo) => addTodoItem(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo item added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add todo item: ${error.message}`);
    },
  });

  return { mutate, isPending };
}

export async function addTodoItem(newTodo) {
  const refactoredTodo = {
    ...newTodo,
    dueDate: newTodo.dueDate ? newTodo.dueDate : "No due date",
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

// -- Custom hook for Deleting item --------------------------------------
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteTodoItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo item deleted successfully!", {});
    },
    onError: (error) => {
      toast.error(`Failed to delete todo item: ${error.message}`);
    },
  });

  return { mutate, isPending };
}

export async function deleteTodoItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo item");
  }
}

// -- Custom hook for updating status --------------------------------------

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (todo) => updateStatus(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  return { mutate, isPending };
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
