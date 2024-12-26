import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import {
  deleteAllTodos,
  deleteTodoById,
  getAllTodos,
  createOrUpdateTodoById,
} from "../services/todo.service";

export const useHandleTodos = (reqOptions: RequestOptions) => {
  const [todos, setTodos] = useState<Array<Todo> | null | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      switch (reqOptions.method?.toLowerCase()) {
        case "get":
          const todos = await getAllTodos(reqOptions);
          setTodos(todos);
          break;

        case "post":
        case "put":
          await createOrUpdateTodoById(reqOptions);
          break;

        case "delete":
          if (reqOptions.url.match("/^/api/items/d+$/")) {
            await deleteTodoById(reqOptions);
          } else {
            await deleteAllTodos(reqOptions);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [reqOptions.url]);

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
    todos,
  };
};
