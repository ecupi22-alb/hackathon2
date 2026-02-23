import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import List from "./components/List";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

const STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("home");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const legacyTasks = localStorage.getItem("task");
    const taskData = savedTasks || legacyTasks;

    if (!taskData) {
      return;
    }

    try {
      const parsedTasks = JSON.parse(taskData);
      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks);
      }
    } catch {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return tasks.slice(-5).reverse();
  }, [tasks]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setView("home");
    showToast("Task added successfully");
  };

  const updateTask = (taskId, updatedTaskData) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData, id: taskId } : task
      )
    );
    setTaskBeingEdited(null);
    showToast("Task updated successfully");
  };

  const openDeleteModal = (taskId) => {
    setTaskIdToDelete(taskId);
  };

  const closeDeleteModal = () => {
    setTaskIdToDelete(null);
  };

  const confirmDeleteTask = () => {
    if (!taskIdToDelete) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskIdToDelete)
    );
    setTaskIdToDelete(null);
    showToast("Task deleted successfully");
  };

  return (
    <div className="App">
      <Navbar view={view} setView={setView} />

      <main className="main-content">
        {view === "home" && (
          <section className="page-card">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <h2>No tasks yet</h2>
                <p>Create your first task to get started.</p>
                <div className="button-row">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setView("add")}
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setView("all")}
                  >
                    View All Tasks
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="section-header">
                  <h2>Recent Tasks</h2>
                  <span>{tasks.length} total</span>
                </div>
                <div className="task-list">
                  {recentTasks.map((task) => (
                    <article key={task.id} className="task-item">
                      <div>
                        <h3>{task.title}</h3>
                        <p>
                          {task.assignedTo || "Unassigned"} |{" "}
                          {task.category || "General"}
                        </p>
                      </div>
                      <span className="status-badge">{task.status}</span>
                    </article>
                  ))}
                </div>
                <div className="button-row">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setView("add")}
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setView("all")}
                  >
                    View All Tasks
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {view === "add" && (
          <section className="page-card">
            <h2>Add Task</h2>
            <Form onSubmit={addTask} submitLabel="Save Task" />
          </section>
        )}

        {view === "all" && (
          <section className="page-card">
            <div className="section-header">
              <h2>All Tasks</h2>
              <span>{tasks.length} total</span>
            </div>
            <List
              tasks={tasks}
              onEdit={setTaskBeingEdited}
              onDelete={openDeleteModal}
            />
          </section>
        )}
      </main>

      <Modal
        isOpen={Boolean(taskBeingEdited)}
        title="Edit Task"
        onClose={() => setTaskBeingEdited(null)}
      >
        {taskBeingEdited ? (
          <Form
            initialValues={taskBeingEdited}
            onSubmit={(updatedTask) => updateTask(taskBeingEdited.id, updatedTask)}
            submitLabel="Save Changes"
            showCancelButton
            onCancel={() => setTaskBeingEdited(null)}
          />
        ) : null}
      </Modal>

      <Modal
        isOpen={Boolean(taskIdToDelete)}
        title="Delete Task"
        onClose={closeDeleteModal}
        actions={
          <>
            <button
              type="button"
              className="secondary-btn"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="danger-btn"
              onClick={confirmDeleteTask}
            >
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>

      {toastMessage ? (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      ) : null}
    </div>
  );
}

export default App;
