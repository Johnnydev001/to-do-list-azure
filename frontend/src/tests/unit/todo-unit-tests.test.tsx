import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { TodoListItem } from "../../components/todo/todolist-item";
import { TodoListView } from "../../components/todo/todolist-view";
import { Todo } from "../../types/todo.type";

describe("Todolist-item tests", () => {
  test("Renders a todo list item and the button is clicked once", async () => {
    // Arrange
    const handleRemoveTodoListItem = vi.fn();
    render(
      <TodoListItem
        text={"todo text"}
        id={"123123"}
        handleRemoveTodoListItem={handleRemoveTodoListItem}
      />
    );
    // Act
    await userEvent.click(screen.getByTestId("btn-123123"));

    // Assert
    expect(handleRemoveTodoListItem).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("trash-icon")).not.toBeUndefined();
    expect(screen.getByText("123")).not.toBeUndefined();
  });
});

describe("Todolist-view tests", () => {
  test("Renders a list of todos", () => {
    const todoList: Todo[] = [
      {
        id: "123",
        text: "todo 123",
      },
      {
        id: "124",
        text: "todo 123",
      },
    ];
    const handleRemoveTodoListItem = vi.fn();
    render(
      <TodoListView
        todoList={todoList}
        handleRemoveTodoListItem={handleRemoveTodoListItem}
      />
    );

    expect(screen.getAllByText("todo 123")).toHaveLength(2);
  });

  test("Renders an empty list of todos", () => {
    const todoList: Todo[] = [];
    const handleRemoveTodoListItem = vi.fn();
    render(
      <TodoListView
        todoList={todoList}
        handleRemoveTodoListItem={handleRemoveTodoListItem}
      />
    );

    expect(screen.getByTestId("todo-list").children).toHaveLength(0);
  });
});
