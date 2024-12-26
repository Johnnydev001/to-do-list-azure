import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { TodoListView } from "./todolist-view";
import { generateRandomId } from "../../utils/utils";
import { useHandleTodos } from "../../hooks/useGetTodos";
import { Todo } from "../../types/todo.type";
import {
  createOrUpdateTodoById,
  deleteAllTodos,
} from "../../services/todo.service";

let requestOptions = {
  url: `${import.meta.env.VITE_BACKEND_ENDOINT}/api/todos`,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const TodoListContainer = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  const { isLoading, error, todos } = useHandleTodos({
    ...requestOptions,
  });

  const handleTextChange = (event: any) => {
    const todoText = event?.target?.value ?? "";

    setTodoText(todoText);
  };

  const handleAddClick = async (event: any) => {
    event?.preventDefault();
    if (todoText?.trim() != "") {
      const newTodo: Todo = {
        text: todoText,
        id: generateRandomId(),
      };
      await createOrUpdateTodoById({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_ENDOINT}/api/todos`,
        body: JSON.stringify(newTodo),
      });

      setTodoList((prevState) => [...prevState, newTodo]);
      setTodoText("");
    }
  };

  const handleRemoveTodoListItem = (todoItemId: string) => {
    if (todoItemId) {
      const todoListWithoutItem = todoList.filter(
        (elem) => elem.id !== todoItemId
      );

      setTodoList(todoListWithoutItem);
    }
  };

  const handleDeleteAll = async () => {
    deleteAllTodos({
      method: "delete",
      url: `${import.meta.env.VITE_BACKEND_ENDOINT}/api/todos`,
    });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">TO DO LIST</h1>

      <form
        className="max-w-sm w-full flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2"
        action="handleAddClick"
      >
        <input
          type="text"
          name="todo-list-text-input"
          id="todo-list-text-input"
          placeholder="Add a new todo"
          className="flex-grow border-[1px] text-gray-600 border-gray-400 focus:border-gray-600 hover:border-gray-600 cursor-pointer p-2 rounded-md placeholder:text-sm placeholder:text-gray-400"
          onChange={handleTextChange}
          value={todoText}
        />

        <button
          onClick={handleAddClick}
          className="bg-blue-700 p-2 text-white rounded-md flex items-center cursor-pointer hover:bg-blue-600"
        >
          <PlusCircle role="button" className="w-4 h-4 mr-2" />
          Add
        </button>
      </form>

      {isLoading && (
        <dialog
          open={isLoading}
          className="p-10 text-center text-md shadow-md rounded-md z-10"
        >
          Loading todos...
        </dialog>
      )}

      {error && (
        <section className="p-4 text-center text-md shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-center">
            Failed to load todos
          </h2>
        </section>
      )}

      {todos && todos.length > 0 && (
        <>
          <TodoListView
            todoList={todos}
            handleRemoveTodoListItem={handleRemoveTodoListItem}
          />

          <button
            onClick={handleDeleteAll}
            className="mt-4 p-2 text-white rounded-md flex items-center cursor-pointer bg-red-700 hover:bg-red-600"
          >
            <Trash2 role="button" className="w-4 h-4 mr-2" />
            Delete all
          </button>
        </>
      )}
    </section>
  );
};
