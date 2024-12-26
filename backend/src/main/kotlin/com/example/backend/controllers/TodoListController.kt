package com.example.backend

import com.example.backend.models.TodoModel
import com.example.backend.services.TodoListService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
class TodoListController(private val todoListService: TodoListService) {

    @GetMapping
    fun getAllTodos(): MutableList<TodoModel> {
        return todoListService.getAllTodos()
    }

    @PutMapping("/{id}")
    @PatchMapping("/{id}")
    fun createOrUpdateTodo(@PathVariable("id") id: String = "", @RequestBody reqBody: TodoModel) {
        todoListService.createOrUpdateTodo(id, reqBody)
    }

    @DeleteMapping("/{id}")
    fun deleteTodoById(@PathVariable("id") id: String = ""): String {
        return todoListService.deleteTodoById(id)
    }

    @DeleteMapping
    fun deleteAllTodos() {
        return todoListService.deleteAllTodos()
    }
}
