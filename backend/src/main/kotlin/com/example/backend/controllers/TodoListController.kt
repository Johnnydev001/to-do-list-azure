package com.example.backend

import com.example.backend.models.TodoModel
import com.example.backend.services.TodoListService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = ["http://localhost:5174"])
class TodoListController(private val todoListService: TodoListService) {

    @GetMapping
    fun getAllTodos(): MutableList<TodoModel> {
        return todoListService.getAllTodos()
    }

    @PutMapping("/{id}")
    fun updateTodo(@PathVariable("id") id: String = "", @RequestBody reqBody: TodoModel) {
        todoListService.updateTodo(id, reqBody)
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
