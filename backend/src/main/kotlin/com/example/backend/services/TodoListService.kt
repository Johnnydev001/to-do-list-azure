package com.example.backend.services

import com.example.backend.models.TodoModel
import com.example.backend.repositories.TodoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TodoService @Autowired constructor(private val todoRepository: TodoRepository) {

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

    fun getAllTodos(): List<TodoModel> {

        return todoRepository.getAllTodos()
    }

    fun deleteTodoById(id: String): String {

        return try {
            todosList.filter { it.id != id }
            "Deleted todo with id ${id} with success"
        } catch (ex: Exception) {
            println("Error deleting todo due to ${ex.message}")
            throw Exception("Error deleting todo due to ${ex.message}")
        }
    }

    fun deleteAllTodos() {
        try {
            todoRepository.deleteAllTodos()
            println("Deleted all todos")
        } catch (ex: Exception) {
            println("Failed to delete all todos due to ${ex.message}")
        }
    }
}
