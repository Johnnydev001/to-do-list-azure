import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types/todo.type";
import { getAllTodos } from "../services/todo.service";

export const useGetTodos = (url: string) => {
  const [todos, setTodos] = useState<Array<Todo> | null | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const todos = await getAllTodos(url);

      setTodos(todos);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

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
