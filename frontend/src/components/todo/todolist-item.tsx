import { Trash } from "lucide-react";

export const TodoListItem = ({
  text = "",
  id = "",
  handleRemoveTodoListItem = () => {},
}: {
  text: string;
  id: string;
  handleRemoveTodoListItem: (id: string) => void;
}) => {
  return (
    <article className="items-center flex justify-between w-full">
      <span className="p-2 bg-white text-black rounded-full text-xs truncate max-w-10">
        {id.slice(id.length-3)}
      </span>
      <span className="text-sm">{text}</span>

      <button
        className="self-end sm:self-auto hover:bg-gray-100 p-2 rounded-full"
        onClick={() => handleRemoveTodoListItem(id)}
      >
        <Trash color="red" className={"w-4 h-4"} />
      </button>
    </article>
  );
};
