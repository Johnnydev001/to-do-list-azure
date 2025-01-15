import { RequestOptions, Todo } from "../types/todo.type";

export const getTodoById = async (reqOptions: RequestOptions) => {
  try {
    let requestUrl = reqOptions?.url + "/" + reqOptions?.body?.id;

    const response = await fetch(requestUrl, {
      headers: reqOptions.headers,
      method: reqOptions.method,
    });

    if (!response.ok) {
      throw new Error("Failed to get todo by id");
    }
  } catch (error) {
    throw new Error(
      `Failed to get todo by id due to: ${JSON.stringify(error)}`
    );
  }
};

export const getAllTodos = async (
  reqOptions: RequestOptions
): Promise<Todo[] | null | undefined> => {
  try {
    let todos: Array<Todo> = [];

    let requestUrl = reqOptions?.url;

    requestUrl += "?sortOrder=" + reqOptions?.sortOrder;

    const response = await fetch(requestUrl, {
      headers: reqOptions.headers,
      method: reqOptions.method,
    });

    if (!response.ok) {
      throw new Error("Failed to get all todos");
    }
    todos = await response.json();

    return todos;
  } catch (error) {
    throw new Error(`Failed to get all todos due to: ${JSON.stringify(error)}`);
  }
};

export const createOrUpdateTodoById = async (reqOptions: RequestOptions) => {
  try {
    const response = await fetch(reqOptions.url, {
      headers: reqOptions.headers,
      method: reqOptions.method,
      body: reqOptions.body,
    });

    if (!response.ok) {
      throw new Error("Failed to create or update todo");
    }
  } catch (error) {
    throw new Error(
      `Failed to create or update todo due to: ${JSON.stringify(error)}`
    );
  }
};

export const deleteTodoById = async (reqOptions: RequestOptions) => {
  try {
    const id = reqOptions?.body?.id || "";
    if (!id) {
      throw new Error("Failed to delete todo by id - no id was provided");
    } else {
      const requestUrlWithId = reqOptions.url + `/${id}`;

      const response = await fetch(requestUrlWithId, {
        headers: reqOptions.headers,
        method: reqOptions.method,
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo by id");
      }
    }
  } catch (error) {
    console.error(
      "Failed to delete todo by id due to: ",
      JSON.stringify(error)
    );
  }
};

export const deleteAllTodos = async (reqOptions: RequestOptions) => {
  try {
    const response = await fetch(reqOptions.url, {
      headers: reqOptions.headers,
      method: reqOptions.method,
    });
    if (!response.ok) {
      throw new Error("Failed to delete all todos");
    }
  } catch (error) {
    console.error(`Failed to delete all todos due to ${JSON.stringify(error)}`);
  }
};
