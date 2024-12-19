package com.example.backend.services

import org.springframework.stereotype.Service
import com.example.backend.models.TodoListModel

@Service
class TodoListService() {


    fun getAllTodos(): List<TodoListModel> {
        val todoList: TodoListModel = TodoListModel()

        return listOf(todoList)
    }

}