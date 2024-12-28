import "./App.css";
import { THEME_MODE, ThemeContext } from "./contexts";
import { Footer } from "./components/footer/footer";
import { TodoListContainer } from "./components/todo/todolist-container";
import { useState } from "react";

function App() {
  const [themeMode, setThemeMode] = useState(THEME_MODE.light);

  return (
    <ThemeContext.Provider value={themeMode}>
      <TodoListContainer setThemeMode={setThemeMode} />
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
