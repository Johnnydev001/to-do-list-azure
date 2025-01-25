import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import {
  createOrUpdateTodoById,
  deleteAllTodos,
  deleteTodoById,
  getAllTodos,
  getTodoByText,
} from "../services/todo.service";

export const useHandleTodos = (
  setTodos: (todos: Array<Todo> | undefined | null) => void,
  reqOptions: RequestOptions,
  currentPage = 1
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    let todos: Todo[] | null | undefined = [];

    try {
      switch (reqOptions?.method?.toLowerCase()) {
        case "post":
          await createOrUpdateTodoById({
            ...reqOptions,
            body: JSON.stringify(reqOptions.body),
          });
          break;

        case "delete":
          const idFromPath = reqOptions?.body?.id || "";
          if (idFromPath) {
            await deleteTodoById({
              ...reqOptions,
              method: "DELETE",
            });
          } else {
            await deleteAllTodos({
              ...reqOptions,
              method: "DELETE",
            });
          }
          break;
        case "get":
          const text = reqOptions?.body?.text ?? "";

          if (text) {
            const todoByText = await getTodoByText({
              ...reqOptions,
            });
            if (todoByText) {
              todos = [todoByText];
            }
          }
          break;
        default:
          break;
      }

      if (!todos.length) {
        todos = await getAllTodos({
          ...reqOptions,
          method: "GET",
        });
      }

      setTodos(todos);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [reqOptions.body, reqOptions.method, reqOptions.sortOrder, currentPage]);

  useEffect(() => {
    let isMounted = true;

    fetchData().then(() => {
      if (!isMounted) {
        return;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return {
    isLoading,
    error,
  };
};
