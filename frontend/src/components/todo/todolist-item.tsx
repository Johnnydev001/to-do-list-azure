import { Trash } from "lucide-react";
import { TodoListItemType } from "./todolist-container";

export const TodoListItem = ({
  text = "",
  checked = false,
  id = "",
}: TodoListItemType) => {
  return (
    <article className="">
      <input
        type="checkbox"
        name="todo-list-item-checkbox"
        id="todo-list-item-checkbox"
        checked={checked}
        onChange={() => {}}
      />

      <label htmlFor="todo-list-item-checkbox"> {text}</label>
      <button className="self-end sm:self-auto" onClick={() => {}}>
        <Trash classNamew-4 h-4 />
      </button>
    </article>
  );
};
