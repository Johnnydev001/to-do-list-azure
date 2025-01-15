package com.example.backend.services

import com.example.backend.models.TodoModel
import com.example.backend.repositories.TodoRepository
import org.springframework.stereotype.Service

@Service
class TodoService(val todoRepository: TodoRepository) {

    fun getTodoById(id: String): TodoModel {
        try {
            return todoRepository.findById(id).orElse(null)
        } catch (ex: Exception) {
            println("Failed to get todo by ID due to ${ex.message}")

            throw ex
        }
    }

    fun createOrUpdateTodoById(reqBody: TodoModel) {
        try {
            val id = reqBody.id
            val existingTodo = todoRepository.findById(id).orElse(null)
            if (existingTodo !== null) {

                val updatedTodo = existingTodo.copy(id = reqBody.id, text = reqBody.text)
                todoRepository.save(updatedTodo)
            } else {
                todoRepository.save(reqBody)
            }
        } catch (ex: Exception) {
            println("Failed to create or update new todo due to ${ex.message}")

            throw ex
        }
    }

    fun getAllTodos(sortOrder: String = "asc"): List<TodoModel> {
        try {
            // For testing purposes:
            // val todosToInsert = (0..99).map { it -> TodoModel(id = "${it}", text = "works ${it}")
            // }
            // todoRepository.saveAll(todosToInsert)
            when (sortOrder) {
                "asc" -> return todoRepository.findAllByOrderByIdAsc()
                else -> {
                    return todoRepository.findAllByOrderByIdDesc()
                }
            }
        } catch (ex: Exception) {
            println("Failed to get all todos due to todo due to ${ex.message}")

            throw ex
        }
    }

    fun deleteTodoById(id: String) {

        try {

            val existingTodo = todoRepository.findById(id).orElse(null)
            if (existingTodo !== null) {

                todoRepository.delete(existingTodo)
            }
        } catch (ex: Exception) {
            println("Failed to delete todo due to ${ex.message}")

            throw ex
        }
    }

    fun deleteAllTodos() {
        try {
            todoRepository.deleteAll()
        } catch (ex: Exception) {
            println("Failed to delete all todos due to ${ex.message}")
            throw ex
        }
    }
}
