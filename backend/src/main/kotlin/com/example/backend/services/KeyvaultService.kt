package com.example.backend.services

import com.azure.identity.DefaultAzureCredentialBuilder
import com.azure.security.keyvault.secrets.SecretClient
import com.azure.security.keyvault.secrets.SecretClientBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class KeyvaultService(@Autowired val env: EnvService) {

    val vaultUrl = EnvService.AZURE_KEYVAULT_URL
    val secretClient: SecretClient =
            SecretClientBuilder()
                    .vaultUrl(vaultUrl)
                    .credential(DefaultAzureCredentialBuilder().build())
                    .buildClient()

    fun getSecretValue(secretName: String): String {
        return secretClient.getSecret(secretName).value
    }
}
