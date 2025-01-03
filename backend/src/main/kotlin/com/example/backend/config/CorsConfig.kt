import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig {

    @Value("\${cors.allowed-origins}") private lateinit var allowedOrigins: String

    @Bean
    fun addCorsConfig(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                val allowedOriginsList = allowedOrigins.split(",").toTypedArray()
                val allowedMethods = "get,put".split(",").toTypedArray()

                registry.addMapping("/**")
                        .allowedOrigins(*allowedOriginsList)
                        .allowedMethods(*allowedMethods)
                        .allowCredentials(true)
            }
        }
    }
}
