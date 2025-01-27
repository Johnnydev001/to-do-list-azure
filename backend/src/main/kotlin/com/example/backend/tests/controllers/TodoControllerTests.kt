import com.example.backend.dto.TodoDTO
import com.example.backend.repositories.TodoRepository
import com.example.backend.services.TodoService
import io.mockk.every
import io.mockk.mockk
import kotlin.test.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TodoControllerTests {

    private var todoRepository: TodoRepository = mockk()
    private val todoService = TodoService(todoRepository)

    @BeforeAll
    fun setup() {

        every { todoService.getAllTodos("asc") } returns
                listOf(TodoDTO(id = "1", text = "Text 1"), TodoDTO(id = "2", text = "Text 2"))
        every { todoService.getAllTodos("desc") } returns
                listOf(TodoDTO(id = "2", text = "Text 2"), TodoDTO(id = "1", text = "Text 1"))
    }

    @Test
    fun `should get all todos by asc order`() {
        val result = todoService.getAllTodos(sortOrder = "asc")

        assertEquals(
                result,
                listOf(TodoDTO(id = "1", text = "Text 1"), TodoDTO(id = "2", text = "Text 2"))
        )
    }

    @Test
    fun `should get all todos by desc order`() {
        val result = todoService.getAllTodos("desc")

        assertEquals(
                result,
                listOf(TodoDTO(id = "2", text = "Text 2"), TodoDTO(id = "1", text = "Text 1"))
        )
    }
}
