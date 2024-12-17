import { Trash } from "lucide-react";

export const TodoListItem = ({ text = "" }) => {
  return (
    <article className="">
      <input
        type="checkbox"
        name="todo-list-item-checkbox"
        id="todo-list-item-checkbox"
      />
      <label htmlFor="todo-list-item-checkbox"> {text}</label>
      <button>
        <Trash />
      </button>
    </article>
  );
};
