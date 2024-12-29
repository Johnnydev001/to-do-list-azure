package com.example.backend.repositories

import com.example.backend.models.TodoModel
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
public interface TodoRepository : MongoRepository<TodoModel, String> {

    fun deleteAllTodos()
    fun getAllTodos(): List<TodoModel>
}
