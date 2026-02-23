import React, { useEffect, useState } from "react";

const defaultTaskValues = {
  title: "",
  assignedTo: "",
  category: "",
  status: "Pending",
  notes: "",
};

function Form({
  initialValues = defaultTaskValues,
  onSubmit,
  submitLabel,
  showCancelButton = false,
  onCancel,
}) {
  const [formValues, setFormValues] = useState({
    ...defaultTaskValues,
    ...initialValues,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormValues({
      ...defaultTaskValues,
      ...initialValues,
    });
    setErrorMessage("");
  }, [initialValues]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.title.trim()) {
      setErrorMessage("Task title is required.");
      return;
    }

    onSubmit({
      title: formValues.title.trim(),
      assignedTo: formValues.assignedTo.trim(),
      category: formValues.category.trim(),
      status: formValues.status,
      notes: formValues.notes.trim(),
    });

    if (!showCancelButton) {
      setFormValues(defaultTaskValues);
    }

    setErrorMessage("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formValues.title}
        onChange={handleInputChange}
        placeholder="Task title"
      />

      <label htmlFor="assignedTo">Assigned To</label>
      <input
        id="assignedTo"
        name="assignedTo"
        type="text"
        value={formValues.assignedTo}
        onChange={handleInputChange}
        placeholder="Team member name"
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        type="text"
        value={formValues.category}
        onChange={handleInputChange}
        placeholder="Example: Development"
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={formValues.status}
        onChange={handleInputChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        value={formValues.notes}
        onChange={handleInputChange}
        placeholder="Write task notes..."
        rows="4"
      />

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <div className="button-row">
        <button type="submit" className="primary-btn">
          {submitLabel}
        </button>
        {showCancelButton ? (
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default Form;
