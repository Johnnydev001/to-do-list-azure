import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import {
  createOrUpdateTodoById,
  deleteAllTodos,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  getTodoByText,
} from "../services/todo.service";

export const useHandleTodos = (
  setTodos: (todos: Array<Todo> | undefined | null) => void,
  reqOptions: RequestOptions
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
        case "put":
          await createOrUpdateTodoById(reqOptions);
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
        default:
          break;
      }

      if (reqOptions?.body) {
        const text = reqOptions?.body?.text ?? "";

        if (text) {
          if (reqOptions?.method === "GET") {
            const todoByText = await getTodoByText({
              ...reqOptions,
            });
            if (todoByText) {
              todos = [todoByText];
            }
          } else {
            todos = await getAllTodos({
              ...reqOptions,
              method: "GET",
            });
          }
        }
      } else {
        todos = await getAllTodos({
          ...reqOptions,
          method: "GET",
        });
      }
      setTodos(todos);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [reqOptions.body, reqOptions.method, reqOptions.sortOrder]);

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
