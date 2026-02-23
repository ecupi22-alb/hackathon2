import React from "react";

function List({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-table-message">No tasks available yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Category</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignedTo || "-"}</td>
              <td>{task.category || "-"}</td>
              <td>{task.status}</td>
              <td>{task.notes || "-"}</td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="secondary-btn small-btn"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger-btn small-btn"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
