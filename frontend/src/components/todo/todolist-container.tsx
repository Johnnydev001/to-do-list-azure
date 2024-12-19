import { PlusCircle, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { TodoListView } from "./todolist-view";
import { generateRandomId } from "../../utils/utils";

export type TodoListItemType = {
  text: string;
  id: string;
};

export const TodoListContainer = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);

  const handleTextChange = (event: any) => {
    const todoText = event?.target?.value ?? "";

    setTodoText(todoText);
  };

  const handleAddClick = (event: any) => {
    event?.preventDefault();
    if (todoText?.trim() != "") {
      const newTodo: TodoListItemType = {
        text: todoText,
        id: generateRandomId(),
      };

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

  const handleDeleteAll = () => {
    if (todoList.length) {
      setTodoList([]);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">TO DO LIST</h1>

      <div className="max-w-sm w-full flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
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
      </div>

      <TodoListView
        todoList={todoList}
        handleRemoveTodoListItem={handleRemoveTodoListItem}
      />

      {todoList.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="mt-6 p-2 text-white rounded-md flex items-center cursor-pointer bg-red-700 hover:bg-red-600"
        >
          <Trash2 role="button" className="w-4 h-4 mr-2" />
          Delete all
        </button>
      )}
    </section>
  );
};
