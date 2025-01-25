package com.example.backend.models

import io.swagger.v3.oas.annotations.media.Schema
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "todo")
@Schema(description = "The Todo Data model")
data class TodoModel(
        @Id
        @field:Schema(description = "The ID of the todo", example = "1", type = "String")
        var id: String?,
        @field:Schema(
                description = "The text of the todo",
                example = "Work on Spring Boot",
                type = "String"
        )
        val text: String = ""
)
