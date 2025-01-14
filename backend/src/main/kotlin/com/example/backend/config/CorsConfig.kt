import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig {

    @Value("\${cors.allowed-origins}") private lateinit var allowedOrigins: String

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**") // Apply to all endpoints
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://example.com"
                        ) // Allow these origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(
                                true
                        ) // Allow sending credentials (cookies, authorization headers) - important
                        // for sessions
                        .maxAge(3600) // Set preflight cache time in seconds
            }
        }
    }
}
