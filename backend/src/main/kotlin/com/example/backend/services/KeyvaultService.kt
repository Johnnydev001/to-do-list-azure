package com.example.backend.services

import com.azure.identity.DefaultAzureCredentialBuilder
import com.azure.security.keyvault.secrets.SecretClient
import com.azure.security.keyvault.secrets.SecretClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class KeyvaultService() {

    @Value("\${azure.keyvault.uri}") private var vaultUrl: String = ""
    @Value("\${azure.keyvault.enabled}") private var isVaultEnabled: Boolean = true

    private lateinit var secretClient: SecretClient

    fun getSecretFromKeyvault(secretName: String): String {
        if (isVaultEnabled) {
            secretClient =
                    SecretClientBuilder()
                            .vaultUrl(vaultUrl)
                            .credential(DefaultAzureCredentialBuilder().build())
                            .buildClient()
        }
        return secretClient.getSecret(secretName).value
                ?: throw IllegalStateException("Failed to get secret from the keyvault")
    }
}
