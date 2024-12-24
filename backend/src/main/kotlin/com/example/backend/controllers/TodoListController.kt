package com.example.backend

import com.example.backend.models.TodoModel
import com.example.backend.services.TodoListService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TodoListController(private val todoListService: TodoListService) {

    @GetMapping("/todos")
    fun getAllTodos(): MutableList<TodoModel> {
        return todoListService.getAllTodos()
    }

    @PutMapping("/createTodo")
    fun createOrUpdateTodo(@RequestBody todo: TodoModel) {
        todoListService.createOrUpdateTodo(todo)
    }

    @DeleteMapping("/deleteTodo/{id}")
    fun deleteTodoById(@PathVariable("id") id: String = ""): String {
        return todoListService.deleteTodoById(id)
    }

    @DeleteMapping("/deleteTodos")
    fun deleteAllTodos() {
        return todoListService.deleteAllTodos()
    }
}
