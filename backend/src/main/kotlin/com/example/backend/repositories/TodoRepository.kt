package com.example.backend.repositories

import com.example.backend.models.TodoModel
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository interface TodoRepository : MongoRepository<TodoModel, String> {}
