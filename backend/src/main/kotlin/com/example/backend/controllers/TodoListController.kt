package com.example.backend

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.example.backend.models.TodoListModel
import com.example.backend.services.TodoListService

@RestController
class TodoListController(private val todoListService: TodoListService) {

    @GetMapping("/test")
    fun getAllTodos (): List<TodoListModel> {
        return todoListService.getAllTodos();
    }
}