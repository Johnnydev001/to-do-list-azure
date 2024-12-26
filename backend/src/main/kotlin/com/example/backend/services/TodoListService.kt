package com.example.backend.services

import com.example.backend.models.TodoModel
import org.springframework.stereotype.Service

@Service
class TodoListService() {

    var todosList: MutableList<TodoModel> = createTodos()

    fun createTodos(): MutableList<TodoModel> {

        var todoList: MutableList<TodoModel> = mutableListOf<TodoModel>()

        for (i in 1..20) {
            val todo = TodoModel(id = i.toString(), "test for ${i.toString()}")

            todoList.add(todo)
        }
        return todoList
    }

    fun updateTodo(id: String, reqBody: TodoModel) {
        try {
            // Find todo by id
            // If exists, update/replace
            // If not, add
            // Use reqBody info
            todosList.add(reqBody)
        } catch (ex: Exception) {
            println("Failed to create or update new todo due to ${ex.message}")
        }
    }

    fun getAllTodos(): MutableList<TodoModel> {

        return todosList
    }

    fun deleteTodoById(id: String): String {

        return try {
            todosList.filter { it.id != id }
            "Deleted todo with id ${id} with success"
        } catch (ex: Exception) {
            println("Error deleting todo due to ${ex.message}")

            "Error deleting todo due to ${ex.message}"
        }
    }

    fun deleteAllTodos() {
        try {} catch (ex: Exception) {
            println("Failed to delete all todos due to ${ex.message}")
        }
    }
}
