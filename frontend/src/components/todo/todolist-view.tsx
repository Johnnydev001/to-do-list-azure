import { useContext } from "react";
import { Todo } from "../../types/todo.type";
import { TodoListItem } from "./todolist-item";
import { THEME_MODE, ThemeContext } from "../contexts";

export const TodoListView = ({
  todoList = [],
  handleRemoveTodoListItem = () => {},
}: {
  todoList: Todo[] | null | undefined;
  handleRemoveTodoListItem: (id: string) => void;
}) => {
  const currentTheme = useContext(ThemeContext);
  const renderTodoListItems = () => {
    return todoList?.map((todo) => (
      <li
        key={todo.id}
        className={`flex flex-col sm:flex-row sm:items-center justify-between  ${
          currentTheme === THEME_MODE.light
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-600"
        } p-2 rounded space-y-2 sm:space-y-0`}
      >
        <TodoListItem
          id={todo.id}
          text={todo.text}
          handleRemoveTodoListItem={handleRemoveTodoListItem}
        />
      </li>
    ));
  };

  return (
    <ul className="grid space-y-2 max-w-sm w-full max-h-56 overflow-y-auto">
      {renderTodoListItems()}
    </ul>
  );
};
