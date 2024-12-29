package com.example.backend.database

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
public class MongoConfig @Autowired constructor() {

    @Value(value = "\${mongodb-connection-string}") private val mongoDbConnectionString: String = ""

    @Bean
    fun connectToMongo(): MongoClient {
        var connString: ConnectionString = ConnectionString(mongoDbConnectionString)

        val settings = MongoClientSettings.builder().applyConnectionString(connString).build()

        return MongoClients.create(settings)
    }
}
