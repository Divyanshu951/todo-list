import { useForm } from "react-hook-form";
import { useAddTodo } from "../services/useTodo";

function ModalForm({ onClose }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { mutate: mutateAddTodo, isPending: isCreating } = useAddTodo();

  function onSuccess(data) {
    mutateAddTodo(data);
    onClose(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md transition-all"
      onClick={() => onClose(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSuccess)}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-stone-800 bg-stone-900/50 p-8 shadow-2xl"
      >
        <div>
          <h2 className="mb-1 text-2xl font-bold">Add New Task</h2>
          <p className="text-sm text-slate-400">
            Fill in the details for your new task below.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-medium after:ml-1 after:text-red-400 after:content-['*']"
          >
            Title
          </label>

          <input
            type="text"
            id="title"
            placeholder="e.g., Complete project report"
            className="w-full rounded-lg border border-gray-300 bg-slate-200 p-2.5 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            {...register("title", {
              required: "This field is required",
            })}
          />
          {errors?.title && (
            <span className="text-red-400">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="dueDate" className="text-sm font-medium">
            Due date <span className="text-stone-500 font-normal">(Optional)</span>
          </label>
          <input
            type="date"
            id="dueDate"
            className="w-full rounded-lg border border-gray-300 bg-slate-200 p-2.5 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            {...register("dueDate")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-sm font-medium after:ml-1 after:text-red-400 after:content-['*']"
          >
            Priority
          </label>
          <select
            id="priority"
            className="w-full rounded-lg border border-gray-300 bg-slate-200 p-2.5 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            {...register("priority")}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          disabled={isCreating}
          type="submit"
          className="relative mt-3 cursor-pointer overflow-hidden rounded-lg bg-zinc-800 py-2 font-semibold text-white transition-all duration-300 after:absolute after:-top-20 after:-left-42 after:h-100 after:w-1/2 after:rotate-10 after:bg-white/10 after:backdrop-blur-[0.5px] after:transition-all after:duration-250 after:content-[''] hover:after:translate-x-[220%] active:scale-95"
        >
          {isCreating ? "Creating task..." : "Save Task"}
        </button>
      </form>
    </div>
  );
}

export default ModalForm;
