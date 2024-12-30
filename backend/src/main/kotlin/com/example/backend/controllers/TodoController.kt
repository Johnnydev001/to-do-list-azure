package com.example.backend.controllers

import com.example.backend.models.TodoModel
import com.example.backend.services.TodoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = ["http://localhost:5173"])
class TodoController(@Autowired val todoService: TodoService) {

        @Operation(description = "Get all the todos from the database")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @GetMapping("/todos")
        fun getAllTodos(): ResponseEntity<List<TodoModel>> {

                return try {
                        ResponseEntity.ok(todoService.getAllTodos())
                } catch (ex: Exception) {
                        println("Error getting all todos due to ${ex.message}")

                        throw Exception("Error getting all todos due to ${ex.message}")
                }
        }

        @Operation(description = "Create or update existing todo")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @PutMapping("/todos/{id}", consumes = ["application/json"])
        fun updateTodo(@PathVariable("id") id: String = "", @RequestBody reqBody: TodoModel) {
                todoService.updateTodo(id, reqBody)
        }

        @Operation(description = "Delete existing todo")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @DeleteMapping("/todos/{id}", consumes = ["application/json"])
        fun deleteTodoById(@PathVariable("id") id: String = "") {
                return todoService.deleteTodoById(id)
        }

        @Operation(description = "Delete all todos from the database")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @DeleteMapping("/todos")
        fun deleteAllTodos() {
                return todoService.deleteAllTodos()
        }
}
