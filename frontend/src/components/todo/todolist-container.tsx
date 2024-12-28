import { Moon, PlusCircle, Sun, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { TodoListView } from "./todolist-view";
import { generateRandomId } from "../../utils/utils";
import { useHandleTodos } from "../../hooks/useGetTodos";
import { Todo } from "../../types/todo.type";
import {
  createOrUpdateTodoById,
  deleteAllTodos,
} from "../../services/todo.service";
import { THEME_MODE, ThemeContext } from "../contexts";

let requestOptions = {
  url: `${import.meta.env.VITE_BACKEND_ENDOINT}/api/todos`,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const TodoListContainer = ({
  setThemeMode = () => {},
}: {
  setThemeMode: any;
}) => {
  const currentTheme = useContext(ThemeContext);
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo> | null | undefined>([]);

  const { isLoading, error } = useHandleTodos(setTodos, {
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
        ...requestOptions,
        body: JSON.stringify(newTodo),
        method: "post",
      });

      //setTodos((prevState) => [...prevState, newTodo]);
      setTodoText("");
    }
  };

  const handleRemoveTodoListItem = (todoItemId: string) => {
    if (todoItemId) {
      const todoListWithoutItem = todos?.filter(
        (elem) => elem.id !== todoItemId
      );

      setTodos(todoListWithoutItem);
    }
  };

  const handleDeleteAll = async () => {
    deleteAllTodos({
      ...requestOptions,
      method: "delete",
    });
    setTodos([]);
  };

  const renderThemeIconBasedOnTheme = () => {
    return currentTheme.valueOf() === THEME_MODE.light ? (
      <Moon role="button" className="w-4 h-4" />
    ) : (
      <Sun role="button" className="w-4 h-4 " />
    );
  };

  return (
    <section
      className={`min-h-screen ${
        currentTheme === THEME_MODE.light
          ? "bg-gray-600 text-white"
          : "bg-gray-100 text-black"
      } flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8`}
    >
      <article
        className="flex items-center space-x-4 mb-4 "
        onClick={() =>
          setThemeMode(
            currentTheme === THEME_MODE.light
              ? THEME_MODE.dark
              : THEME_MODE.light
          )
        }
      >
        <h1 className="text-2xl font-bold  text-center">TO DO LIST</h1>
        {renderThemeIconBasedOnTheme()}
      </article>

      <form
        className="max-w-sm w-full flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2"
        action="handleAddClick"
      >
        <input
          type="text"
          name="todo-list-text-input"
          id="todo-list-text-input"
          placeholder="Add a new todo"
          className={`flex-grow border-[1px]  ${
            currentTheme === THEME_MODE.light
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-600 border-gray-400  focus:border-gray-600 hover:border-gray-600 placeholder:text-gray-400"
          }   cursor-pointer p-2 rounded-md placeholder:text-sm `}
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
