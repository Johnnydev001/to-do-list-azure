package com.example.backend.config

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MongoConfig() {

    @Value("\${database.uri}") var mongoDbConnectionString: String = ""

    @Bean
    fun mongoClient(): MongoClient {

        // var connectionString: String
        // try {
        //     connectionString = keyvaultService.getSecretFromKeyvault(connectionString)
        // } catch (ex: Exception) {
        //     throw ex
        // }

        val connString: ConnectionString = ConnectionString(mongoDbConnectionString)

        val settings = MongoClientSettings.builder().applyConnectionString(connString).build()

        return MongoClients.create(settings)
    }
}
