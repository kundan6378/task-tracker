import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const index = localStorage.getItem("editTaskIndex");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (index !== null && tasks[index]) {
      setTitle(tasks[index].title);
      setDescription(tasks[index].description);
      setEditIndex(index);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editIndex !== null) {
      tasks[editIndex] = { ...tasks[editIndex], title, description };
      localStorage.removeItem("editTaskIndex");
    } else {
      tasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    navigate("/TaskList");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {editIndex !== null ? "Edit Task" : "Create New Task"}
        </h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
        >
          {editIndex !== null ? "Update Task" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
