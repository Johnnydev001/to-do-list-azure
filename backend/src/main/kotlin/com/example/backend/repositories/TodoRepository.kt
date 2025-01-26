package com.example.backend.repositories

import com.example.backend.models.TodoModel
import java.util.Optional
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoRepository : MongoRepository<TodoModel, String> {
    fun findAllByOrderByTextAsc(): Optional<List<TodoModel>>
    fun findAllByOrderByTextDesc():  Optional<List<TodoModel>>
    fun findByText(text: String): Optional<TodoModel>
}
