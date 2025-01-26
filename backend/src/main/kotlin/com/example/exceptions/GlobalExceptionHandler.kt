import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

data class ErrorResponse(val message: String?)

@ResponseStatus(HttpStatus.NOT_FOUND)
class NotFoundException(message: String) : RuntimeException(message)

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
class GeneralException(message: String) : RuntimeException(message)

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException::class)
    fun notFoundHandler(ex: NotFoundException): ResponseEntity<ErrorResponse> =
            ResponseEntity(ErrorResponse(message = ex.message), HttpStatus.NOT_FOUND)

    @ExceptionHandler(GeneralException::class)
    fun generalExceptionHandler(): ResponseEntity<ErrorResponse> =
            ResponseEntity(
                    ErrorResponse(message = "An unexpected error occurred"),
                    HttpStatus.INTERNAL_SERVER_ERROR
            )
}
