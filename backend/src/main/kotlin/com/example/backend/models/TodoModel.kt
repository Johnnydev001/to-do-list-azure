package com.example.backend.models

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "The Todo Data model")
data class TodoModel(
        @field:Schema(description = "The ID of the todo", example = "1", type = "String")
        val id: String? = "",
        @field:Schema(
                description = "The text of the todo",
                example = "Work on Spring Boot",
                type = "String"
        )
        val text: String = ""
)
