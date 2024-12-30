package com.example.backend.services

import org.springframework.stereotype.Service

@Service
class EnvService() {

    val AZURE_KEYVAULT_URL =
            System.getenv("AZURE_KEYVAULT_URL")
                    ?: throw IllegalStateException("Failed to get keyvault url")
}
