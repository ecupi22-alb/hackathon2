import React from "react";

function Navbar({ view, setView }) {
  return (
    <nav className="navbar">
      <h1>Task App</h1>

      <div className="nav-buttons">
        <button
          type="button"
          className={`nav-btn ${view === "home" ? "active" : ""}`}
          onClick={() => setView("home")}
        >
          Home
        </button>

        <button
          type="button"
          className={`nav-btn ${view === "add" ? "active" : ""}`}
          onClick={() => setView("add")}
        >
          Add Task
        </button>

        <button
          type="button"
          className={`nav-btn ${view === "all" ? "active" : ""}`}
          onClick={() => setView("all")}
        >
          All Tasks
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
