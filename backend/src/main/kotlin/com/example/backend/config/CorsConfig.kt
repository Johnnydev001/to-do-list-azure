import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig : WebMvcConfigurer {

    @Value("\${cors.allowed-origins}") private lateinit var allowedOrigins: String

    override fun addCorsMappings(registry: CorsRegistry) {
        val allowedOriginsList = allowedOrigins.split(",").toTypedArray()
        val allowedMethods = "get,put".split(",").toTypedArray()
        registry.addMapping("/api/v1/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedOrigins("http://localhost:5173")
                .allowedHeaders("*")
                .maxAge(-1)
    }
}
