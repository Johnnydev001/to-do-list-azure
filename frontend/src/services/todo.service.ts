import env from "react-dotenv";
import { Todo } from "../types/todo.type";

const getAllTodos = async (): Promise<Todo[] | null | undefined> => {
  try {
    const requestInfo = {
      method: "GET",
      url: `${env.BACKEND_ENDOINT}/api`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    let todos: Array<Todo> = [];

    const response = await fetch(requestInfo.url, {
      headers: requestInfo.headers,
      method: requestInfo.method,
    });

    if (response.ok) {
      todos = await response.json();
    }

    return todos;
  } catch (error) {
    console.error(
      "Failed to remove todo by id due to: ",
      JSON.stringify(error)
    );
  }
};

const updateTodoById = async (id: string) => {
  try {
    const requestInfo = {
      method: "PUT",
      url: `${env.BACKEND_ENDOINT}/api/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await fetch(requestInfo.url, {
      headers: requestInfo.headers,
      method: requestInfo.method,
    });
  } catch (error) {
    console.error(
      `Failed to update todo by id due to ${JSON.stringify(error)}`
    );
  }
};

const deleteTodoById = async (id: string) => {
  try {
    const requestInfo = {
      method: "DELETE",
      url: `${env.BACKEND_ENDOINT}/api/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await fetch(requestInfo.url, {
      headers: requestInfo.headers,
      method: requestInfo.method,
    });
  } catch (error) {
    console.error(
      "Failed to remove todo by id due to: ",
      JSON.stringify(error)
    );
  }
};

const deleteAllTodos = async () => {
  try {
    const requestInfo = {
      method: "DELETE",
      url: `${env.BACKEND_ENDOINT}/api/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await fetch(requestInfo.url, {
      headers: requestInfo.headers,
      method: requestInfo.method,
    });
  } catch (error) {
    console.error(`Failed to delete all todos due to ${JSON.stringify(error)}`);
  }
};
