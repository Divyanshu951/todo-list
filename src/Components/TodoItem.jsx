import { deleteTodoItem, updateStatus } from "../services/useTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

function TodoItem({ todo }) {
  const { title, priority, dueDate } = todo;

  // tanstack logic
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteTodoItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo item deleted successfully!", {});
    },
    onError: (error) => {
      toast.error(`Failed to delete todo item: ${error.message}`);
    },
  });

  const { mutate: updateSt, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (todo) => updateStatus(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  const priorityStyle = {
    low: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    medium: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    high: "border-red-500/50 bg-red-500/10 text-red-300",
  };

  if (isDeleting)
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/50">
        <BarLoader color="#d6d3d1" />
      </div>
    );

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 hover:bg-stone-800/80 ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      {/* Decorative gradient blur */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-stone-700/20 blur-3xl transition-all duration-500 group-hover:bg-stone-600/30"></div>

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <h2
            className={`mb-1.5 min-w-40 text-xl font-semibold tracking-wide text-stone-100 ${todo.completed ? "text-stone-400 line-through" : ""}`}
          >
            {title}
          </h2>
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <span className="opacity-80">🗓️</span>
            <span>{dueDate}</span>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase shadow-sm ${
            priorityStyle[priority] || priorityStyle.low
          }`}
        >
          {priority}
        </span>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          disabled={isUpdatingStatus ?? false}
          className={`flex-1 cursor-pointer rounded-xl border py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] ${
            todo.completed
              ? "border-emerald-900/50 bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/40"
              : "border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-600 hover:text-white"
          }`}
          onClick={() => updateSt(todo)}
        >
          {todo.completed ? "✓ Completed" : "Mark as Complete"}
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl border border-red-900/30 bg-red-950/30 p-2.5 text-red-400 transition-all duration-300 hover:scale-[1.05] hover:bg-red-900/50 hover:text-red-300"
          onClick={() => deleteTodo(todo.id)}
          title="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
