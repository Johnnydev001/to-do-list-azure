import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import { deleteTodoById, getAllTodos } from "../services/todo.service";

export const useHandleTodos = (
  setTodos: (todos: Array<Todo> | undefined | null) => void,
  reqOptions: RequestOptions
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    switch (reqOptions.method) {
      case "DELETE":
        await deleteTodoById(
          {
            ...reqOptions,
            method: "DELETE",
          },
          reqOptions.body.id
        );
        break;

      default:
        break;
    }

    try {
      const todos = await getAllTodos(reqOptions);
      setTodos(todos);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [reqOptions.url, reqOptions.method]);

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
