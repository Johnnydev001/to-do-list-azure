import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import {
  createOrUpdateTodoById,
  deleteAllTodos,
  deleteTodoById,
  getAllTodos,
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

    try {
      switch (reqOptions?.method?.toLocaleLowerCase()) {
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
              method: "delete",
            });
          }

          break;
        default:
          break;
      }

      const todos = await getAllTodos({
        ...reqOptions,
        method: "GET",
      });

      setTodos(todos);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [reqOptions.url, reqOptions.body, reqOptions.method]);

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
