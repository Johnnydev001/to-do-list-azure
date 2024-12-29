import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig() {

    @Value("${mongodb-connection-string}")
    private String mongoDbConnectionString;

    @Bean
    public MongoClient connectToMongo() {
        ConnectionString connString = new ConnectionString(mongoDbConnectionString);

        MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(mongoDbConnectionString).build();

        return MongoClients.create(settings)
    }
    
}