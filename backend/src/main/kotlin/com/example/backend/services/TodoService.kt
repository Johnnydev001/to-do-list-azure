package com.example.backend.services

import NotFoundException
import com.example.backend.controllers.TodoModelRequest
import com.example.backend.dto.TodoDTO
import com.example.backend.models.TodoModel
import com.example.backend.repositories.TodoRepository
import org.springframework.stereotype.Service

interface TodoServiceInterface {
    fun getTodoByText(text: String = ""): TodoDTO
    fun createTodoById(reqBody: TodoModelRequest)
    fun getAllTodos(sortOrder: String): List<TodoDTO>
    fun deleteTodoById(id: String)
    fun deleteAllTodos()
}

@Service
class TodoService(val todoRepository: TodoRepository) : TodoServiceInterface {

    override fun getTodoByText(text: String): TodoDTO {
        var todo: TodoModel =
                todoRepository.findByText(text).orElseThrow {
                    NotFoundException(message = "Todo not found with text ${text}")
                }

        val todoDTO: TodoDTO = TodoDTO(id = todo.id, text = todo.text)

        return todoDTO
    }

    override fun createTodoById(reqBody: TodoModelRequest) {
        try {

            val todoModelToCreate = TodoModel(id = reqBody.id, text = reqBody.text)
            todoRepository.save(todoModelToCreate)
        } catch (ex: Exception) {
            println("Failed to create or update new todo due to ${ex}")

            throw ex
        }
    }

    override fun getAllTodos(sortOrder: String): List<TodoDTO> {
        try {
            var todoList: List<TodoModel>

            when (sortOrder) {
                "asc" -> todoList = todoRepository.findAllByOrderByTextAsc().orElse(emptyList())
                else -> {
                    todoList = todoRepository.findAllByOrderByTextDesc().orElse(emptyList())
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

    override fun deleteTodoById(id: String) {

        try {
            val existingTodo: TodoModel =
                    todoRepository.findById(id).orElseThrow {
                        NotFoundException(message = "Todo not found with ${id})")
                    }
            todoRepository.delete(existingTodo)
        } catch (ex: Exception) {
            println("Failed to delete todo due to ${ex}")

            throw ex
        }
    }

    override fun deleteAllTodos() {
        todoRepository.deleteAll()
    }
}
