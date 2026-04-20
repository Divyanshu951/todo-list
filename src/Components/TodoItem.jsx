import { deleteTodoItem, updateStatus } from "../services/useTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

function TodoItem({ todo }) {
  const { title, priority, dueDate } = todo;

  console.log(priority);

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
    Low: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    Medium: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    High: "border-red-500/50 bg-red-500/10 text-red-300",
  };

  if (isDeleting)
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/50">
        <BarLoader color="#d6d3d1" />
      </div>
    );

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-800 bg-neutral-900 px-5 py-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 hover:bg-stone-800/80 ${
        todo.completed ? "opacity-70" : ""
      } md:p-5`}
    >
      {/* Decorative gradient blur */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-stone-700/20 blur-3xl transition-all duration-500 group-hover:bg-stone-600/30"></div>

      <div className="relative mb-2 flex items-start justify-between gap-4 md:mb-5">
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
          className={`flex-1 cursor-pointer rounded-xl border py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed ${
            todo.completed
              ? "border-emerald-900/50 bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/40"
              : "border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-600 hover:text-white"
          }`}
          onClick={() => updateSt(todo)}
        >
          {todo.completed ? "✓ Completed" : "Mark as Complete"}
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl border border-red-900/30 p-2.5 text-red-400 transition-all duration-300 hover:scale-[1.05] hover:bg-red-900/50 hover:text-red-300"
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
        {/* <button
          disabled
          className="flex cursor-pointer items-center justify-center rounded-xl border border-blue-900/30 p-2.5 text-red-400 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-900/50 hover:text-red-300 disabled:cursor-not-allowed"
          onClick={() => deleteTodo(todo.id)}
          title="Delete task"
        >
          <svg
            className="h-5 w-5"
            fill="#fff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="800px"
            height="800px"
            viewBox="0 0 494.936 494.936"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                />
                <path
                  d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                />
              </g>
            </g>
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default TodoItem;
