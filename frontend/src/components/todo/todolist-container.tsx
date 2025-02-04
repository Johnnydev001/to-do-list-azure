import {
  ArrowDownUp,
  ArrowUpDown,
  Moon,
  PlusCircle,
  Sun,
  Trash2,
} from "lucide-react";
import { useContext, useState } from "react";
import { TodoListView } from "./todolist-view";

import { Todo } from "../../types/todo.type";

import { THEME_MODE, ThemeContext } from "../../contexts";
import { useHandleTodos } from "../../hooks/useHandleTodos";
import { CustomSearchInput } from "../ui/searchInput";
import { PaginationContainer } from "../pagination/pagination-container";
import { useHandlePagination } from "../../hooks/useHandlePagination";

export const TodoListContainer = ({
  setThemeMode = () => {},
}: {
  setThemeMode: any;
}) => {
  const currentTheme = useContext(ThemeContext);

  const [todoText, setTodoText] = useState<string>("");
  const [searchedText, setSearchedText] = useState<string>("");

  const [todos, setTodos] = useState<Array<Todo> | null | undefined>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 25;

  const [reqOptions, setReqOptions] = useState<any>({
    url: `${import.meta.env.VITE_BACKEND_ENDOINT}/api/v1/todos`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    sortOrder: "asc",
    origin: window.location.origin,
  });

  const { isLoading, error } = useHandleTodos(
    setTodos,
    {
      ...reqOptions,
    },
    currentPage
  );

  useHandlePagination(todos, setTodos, currentPage, itemsPerPage);

  const handleTextChange = (event: any) => {
    const todoText = event?.target?.value ?? "";

    setTodoText(todoText);
  };

  const handleSearchTextChange = (event: any) => {
    const text = event?.target?.value ?? "";

    setSearchedText(text);
  };

  const handleAddClick = async (event: any) => {
    event?.preventDefault();
    if (todoText?.trim() != "") {
      let newTodo: Todo = {
        text: todoText,
      };

      setReqOptions({
        ...reqOptions,
        body: newTodo,
        method: "post",
      });
      setTodoText("");
    }
  };

  const handleSearchByText = async (event: any) => {
    event?.preventDefault();
    if (searchedText) {
      setReqOptions({
        ...reqOptions,
        body: {
          text: searchedText,
        },
        method: "GET",
      });
    } else {
      setReqOptions({
        ...reqOptions,
        method: "GET",
        body: undefined,
      });
    }
    setSearchedText("");
  };

  const handleRemoveTodoListItem = (todoItemId: string) => {
    if (todoItemId !== "") {
      setReqOptions({
        ...reqOptions,
        method: "DELETE",
        body: {
          id: todoItemId,
        },
      });
    }
    setSearchedText("");
  };

  const handleDeleteAll = () => {
    setReqOptions({
      ...reqOptions,
      method: "DELETE",
    });
  };

  const renderThemeIconBasedOnTheme = () => {
    return currentTheme.valueOf() === THEME_MODE.light ? (
      <Sun role="button" className="w-4 h-4 " />
    ) : (
      <Moon role="button" className="w-4 h-4" />
    );
  };

  const handleSortTodos = (sortOrder = "asc") => {
    setReqOptions({
      ...reqOptions,
      method: "GET",
      sortOrder,
      body: undefined,
    });
  };

  const renderFilterSortingSection = () => {
    return (
      <article className="flex justify-between items-center space-x-4">
        <form onSubmit={handleSearchByText}>
          <CustomSearchInput
            type="text"
            name="todo-list-search-text-input"
            id="todo-list-search-text-input"
            placeholder="Search todo and click enter"
            className={`flex-grow border-[1px]  ${
              currentTheme === THEME_MODE.light
                ? "bg-white text-gray-700 border-gray-400 border-[1px]"
                : "bg-white text-gray-700 border-gray-400 border-[1px]  focus:border-gray-600 hover:border-gray-600 placeholder:text-gray-400"
            }   cursor-pointer p-2 rounded-md placeholder:text-sm `}
            onChange={handleSearchTextChange}
            value={searchedText}
          />
        </form>

        <article className="grid justify-start items-start cursor-pointer">
          {reqOptions?.sortOrder === "asc" ? (
            <ArrowDownUp
              className="w-4 h-4"
              onClick={() => handleSortTodos("desc")}
            />
          ) : (
            <ArrowUpDown
              className="w-4 h-4"
              onClick={() => handleSortTodos("asc")}
            />
          )}
        </article>
      </article>
    );
  };

  return (
    <section
      data-testid="todo-container"
      className={`min-h-screen ${
        currentTheme === THEME_MODE.dark
          ? "bg-gray-600 text-white"
          : "bg-gray-200 text-black"
      } flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8`}
    >
      <h1 className="text-2xl font-bold  text-center">TO DO LIST</h1>

      <button
        data-testid="theme-btn"
        className="flex items-center space-x-4 mb-4 "
        onClick={() =>
          setThemeMode(
            currentTheme === THEME_MODE.light
              ? THEME_MODE.dark
              : THEME_MODE.light
          )
        }
      >
        {renderThemeIconBasedOnTheme()}
      </button>

      {renderFilterSortingSection()}

      <form
        className="border-t-[1px] border-gray-400  mt-4 pt-4 max-w-sm w-full flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2"
        action="handleAddClick"
      >
        <CustomSearchInput
          type="text"
          name="todo-list-text-input"
          data-testid="todo-list-text-input"
          id="todo-list-text-input"
          placeholder="Add a new todo"
          className={`flex-grow border-[1px]  ${
            currentTheme === THEME_MODE.light
              ? "bg-white text-gray-700 border-gray-400 border-[1px]"
              : "bg-white text-gray-700 border-gray-400 border-[1px]  focus:border-gray-600 hover:border-gray-600 placeholder:text-gray-400"
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
        <section className="p-4 text-center text-md shadow-md rounded-md bg-red-600 text-white">
          <h2 className="text-xl font-semibold text-center">{error}</h2>
        </section>
      )}

      {todos && todos.length > 0 && (
        <>
          <TodoListView
            todoList={todos}
            handleRemoveTodoListItem={handleRemoveTodoListItem}
          />

          <div className="flex justify-between items-center max-w-sm w-full mt-4">
            <button
              data-testid="delete-all-btn"
              onClick={handleDeleteAll}
              className="space-x-2 p-2 text-white rounded-md flex items-center justify-center cursor-pointer text-center bg-red-700 hover:bg-red-600"
            >
              <Trash2 role="button" className="w-4 h-4 " />
              <span>Delete all</span>
            </button>
            <PaginationContainer
              totalPages={Math.ceil(100 / itemsPerPage)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
};
