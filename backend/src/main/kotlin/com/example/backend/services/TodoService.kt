package com.example.backend.services

import com.example.backend.controllers.TodoModelRequest
import com.example.backend.dto.TodoDTO
import com.example.backend.models.TodoModel
import com.example.backend.repositories.TodoRepository
import org.springframework.stereotype.Service

@Service
class TodoService(val todoRepository: TodoRepository) {

    fun getTodoByText(text: String): TodoDTO {
        try {

            var todo: TodoModel = todoRepository.findByText(text)

            val todoDTO: TodoDTO = TodoDTO(id = todo.id, text = todo.text)

            return todoDTO
        } catch (ex: Exception) {
            println("Failed to get todo by ID due to ${ex}")

            throw ex
        }
    }

    fun createTodoById(reqBody: TodoModelRequest) {
        try {

            val todoModelToCreate = TodoModel(id = reqBody.id, text = reqBody.text)
            todoRepository.save(todoModelToCreate)
        } catch (ex: Exception) {
            println("Failed to create or update new todo due to ${ex}")

            throw ex
        }
    }

    fun getAllTodos(sortOrder: String = "asc"): List<TodoDTO> {
        try {
            // For testing purposes:
            // val todosToInsert = (0..99).map { it -> TodoModel(id = "${it}", text = "works ${it}")
            // }
            // todoRepository.saveAll(todosToInsert)
            var todoList: List<TodoModel> = emptyList()

            when (sortOrder) {
                "asc" -> todoList = todoRepository.findAllByOrderByTextAsc()
                else -> {
                    todoList = todoRepository.findAllByOrderByTextDesc()
                }
            }
            var todoDtoList: List<TodoDTO> =
                    todoList.map { it -> TodoDTO(id = it.id, text = it.text) }
            return todoDtoList
        } catch (ex: Exception) {
            println("Failed to get all todos due to todo due to ${ex}")

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
            println("Failed to delete todo due to ${ex}")

            throw ex
        }
    }

    fun deleteAllTodos() {
        try {
            todoRepository.deleteAll()
        } catch (ex: Exception) {
            println("Failed to delete all todos due to ${ex}")
            throw ex
        }
    }
}
