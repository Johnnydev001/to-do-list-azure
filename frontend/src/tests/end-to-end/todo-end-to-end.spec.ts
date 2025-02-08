import { test, expect } from "@playwright/test";

test.describe("Todo list tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test("Renders the todo list app", async ({ page }) => {
    await expect(page).toHaveTitle("To do list");

    await expect(
      page.getByRole("button", {
        name: "Delete all",
      })
    ).toBeDefined();
  });

  test("Renders an empty list of todos and pagination itens", async ({
    page,
  }) => {
    const todoList = await page.getByTestId("todo-list");
    await expect(todoList).not.toBeUndefined();
    await expect(await todoList.all()).toEqual([]);

    const paginationList = await page.getByTestId("todo-list");

    await expect(paginationList).not.toBeUndefined();
    await expect(await paginationList.all()).toEqual([]);
  });
});
