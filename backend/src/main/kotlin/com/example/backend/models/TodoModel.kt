package com.example.backend.models

import java.sql.Date

data class TodoModel(val id: String? = "", val text: String = "", val date: Date) {}
