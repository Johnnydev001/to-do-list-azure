package com.example.backend.controllers

import com.example.backend.dto.TodoDTO
import com.example.backend.models.TodoModel
import com.example.backend.services.TodoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(
        origins = ["http://localhost:5173"],
        allowedHeaders = ["Content-Type", "Accept"],
        methods =
                [
                        RequestMethod.OPTIONS,
                        RequestMethod.GET,
                        RequestMethod.PUT,
                        RequestMethod.POST,
                        RequestMethod.DELETE]
)
class TodoController(val todoService: TodoService) {

        @Operation(description = "Get todo by text")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @GetMapping("/todos/{text}")
        fun getTodoById(@Valid @PathVariable text: String): ResponseEntity<TodoDTO> {

                return try {
                        ResponseEntity.ok(todoService.getTodoByText(text))
                } catch (ex: Exception) {
                        println("Error getting todo by text due to ${ex.message}")

                        throw Exception("Error getting todo by text due to ${ex.message}")
                }
        }

        @Operation(description = "Get all the todos from the database")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @GetMapping("/todos")
        fun getAllTodos(@Valid @RequestParam sortOrder: String): ResponseEntity<List<TodoDTO>> {

                return try {
                        ResponseEntity.ok(todoService.getAllTodos(sortOrder))
                } catch (ex: Exception) {
                        println("Error getting all todos due to ${ex.message}")
                        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null)
                }
        }

        @Operation(description = "Create or update existing todo")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @PostMapping("/todos", consumes = ["application/json"])
        fun createTodoById(@Valid @RequestBody reqBody: TodoModel) {
                try {
                        todoService.createTodoById(reqBody)
                } catch (ex: Exception) {
                        println("Failed to create todo by id due to ${ex.message}")
                }
        }

        @Operation(description = "Delete existing todo")
        @ApiResponses(
                value =
                        [
                                ApiResponse(description = "Success", responseCode = "200"),
                                ApiResponse(description = "Failure", responseCode = "500")]
        )
        @DeleteMapping("/todos/{id}")
        fun deleteTodoById(@Valid @PathVariable("id") id: String = "") {
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
