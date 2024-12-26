import { useCallback, useEffect, useState } from "react";
import { RequestOptions, Todo } from "../types/todo.type";
import { getAllTodos } from "../services/todo.service";

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
      const todos = await getAllTodos(reqOptions);
      setTodos(todos);
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
  };
};
