import { PlusCircle } from "lucide-react";
export const TodoList = () => {
  return (
    <section className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow w-full sm:w-96">
      <h1 className="text-2xl font-bold mb-4">To do list:</h1>

      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          name="todo-list-text-input"
          id="todo-list-text-input"
          placeholder="Add a new todo"
          className="flex-grow border-[1px] border-gray-400 p-2 rounded-md"
        />

        <button className="bg-black p-2 text-white rounded-md flex items-center cursor-pointer">
          <PlusCircle role="button" className="w-4 h-4 mr-2" />
          Add
        </button>
      </div>
    </section>
  );
};
