import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/TaskList" element={<TaskList />} />
        <Route path="/TaskForm" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
