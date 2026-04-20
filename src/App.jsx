import useTodo, { addTodoItem } from "./services/useTodo";
import { RotateLoader } from "react-spinners";
import TodoItem from "./Components/TodoItem";
import Header from "./Components/Header";
import { Form } from "react-hook-form";
import ModelForm from "./Components/ModelForm";
import { useState } from "react";
import GithubIcon from "./Components/GithubIcon";

function App() {
  const [isModelVisible, setIsModelVisible] = useState(false);
  const { isPending, data, error } = useTodo();

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
      <GithubIcon />
      {isModelVisible && (
        <ModelForm
          onIsModelVisible={setIsModelVisible}
          addTodoItem={addTodoItem}
        />
      )}

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-5 md:pt-12">
        <button
          className="mb-5 w-full cursor-pointer rounded-2xl border border-amber-700/50 bg-stone-900/80 px-2 py-2 text-xl font-medium tracking-wide text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:bg-stone-800 disabled:opacity-50 md:mb-10 md:px-4 md:py-4"
          onClick={() => setIsModelVisible((prev) => !prev)}
        >
          + Add New Task
        </button>

        <div className="mx-auto flex max-w-3xl flex-col gap-3 md:gap-6">
          {Array.isArray(data) &&
            data.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
