package com.example.backend.database

import com.example.backend.services.KeyvaultService
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MongoConfig(@Autowired val keyvaultService: KeyvaultService) {

    // @Value("\${mongo-db-connection-string}") lateinit var mongoDbConnectionString: String

    @Bean
    fun connectToMongo(): MongoClient {

        var connectionString: String
        try {
            connectionString = keyvaultService.getSecretValue("mongo-db-connection-string")
        } catch (ex: Exception) {
            throw ex
        }

        val connString: ConnectionString = ConnectionString(connectionString)

        val settings = MongoClientSettings.builder().applyConnectionString(connString).build()

        return MongoClients.create(settings)
    }
}
