import useTodo, { addTodoItem } from "./services/useTodo";
import { RotateLoader } from "react-spinners";
import TodoItem from "./Components/TodoItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Header from "./Components/Header";
import { Form } from "react-hook-form";
import ModelForm from "./Components/ModelForm";
import { useState } from "react";

function App() {
  const [isModelVisible, setIsModelVisible] = useState(false);
  const { isPending, data, error } = useTodo();
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: () =>
      addTodoItem({
        title: "Solve 5 DSA problems",
        completed: false,
        priority: "high",
        dueDate: "2026-04-18",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo item added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add todo item: ${error.message}`);
    },
  });

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center">
        <RotateLoader color="#fff" />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-semibold">Error fetching ToDo list.</h1>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col bg-stone-950 text-stone-200">
      <Header />
      {isModelVisible && <ModelForm onIsModelVisible={setIsModelVisible} />}

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
        <button
          disabled={isCreating ?? false}
          className="mb-10 w-full cursor-pointer rounded-2xl border border-amber-700/50 bg-stone-900/80 px-4 py-4 text-xl font-medium tracking-wide text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:bg-stone-800 disabled:opacity-50"
          onClick={() => setIsModelVisible((prev) => !prev)}
        >
          {isCreating ? "Adding..." : "+ Add New Task"}
        </button>

        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {Array.isArray(data) &&
            data.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
