import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' | 'completed' | 'pending'
  const allCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleComplete = (indexToUpdate) => {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToUpdate ? { ...task, completed: !task.completed } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEdit = (indexToEdit) => {
    localStorage.setItem("editTaskIndex", indexToEdit);
    navigate("/TaskForm");
  };

  const handleCreateTask = () => {
    localStorage.removeItem("editTaskIndex");
    navigate("/TaskForm");
    console.log("Create Task Clicked");
  };
  const filteredTasks = tasks
    .filter((task) => {
      if (searchQuery.trim() === "") return true;

      const q = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
      );
    })
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true; // for 'all'
    });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full px-4 py-4">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Logo */}
          <div className="text-xl font-bold text-cyan-600 mb-4 sm:mb-0">
            TaskTracker
          </div>

          {/* Right: Filters + Search + Create (pushed to far right using ml-auto) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4 w-full sm:w-auto sm:ml-auto">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-end">
              {[
                { type: "all", label: "All", count: allCount },
                {
                  type: "completed",
                  label: "Completed",
                  count: completedCount,
                },
                { type: "pending", label: "Pending", count: pendingCount },
              ].map(({ type, label, count }) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors duration-300
              ${
                filter === type
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-cyan-100"
              }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>

            {/* Search + Create */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
              />

              <button
                onClick={handleCreateTask}
                className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition w-full sm:w-auto"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tasks Section */}
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No matching tasks found.
          </p>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              description={task.description}
              completed={task.completed}
              createdAt={task.createdAt}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
              onComplete={() => handleComplete(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
