package com.example.backend.services

import com.example.backend.models.TodoModel
import com.example.backend.repositories.TodoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TodoService @Autowired constructor(private val todoRepository: TodoRepository) {

    fun updateTodo(id: String, reqBody: TodoModel) {
        try {

            val existingTodo = todoRepository.findById(id).orElse(null)
            if (existingTodo !== null) {

                val updatedTodo = existingTodo.copy(id = reqBody.id, text = reqBody.text)
                todoRepository.save(updatedTodo)
            }
        } catch (ex: Exception) {
            println("Failed to create or update new todo due to ${ex.message}")

            throw ex
        }
    }

    fun getAllTodos(): List<TodoModel> {

        return todoRepository.findAll()
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
