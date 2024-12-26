package com.example.backend.models

import java.time.LocalDate

data class TodoModel(val id: String? = "", val text: String = "", val date: LocalDate) {}
