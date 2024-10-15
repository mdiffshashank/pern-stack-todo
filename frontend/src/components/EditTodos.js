import React, { useState } from "react";

const EditTodos = ({ todo, setRefetch }) => {
  const [description, setDescription] = useState(todo.description);

  const reset = () => {
    setDescription(todo.description);
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (res.ok) {
        // window.location = "/"; // never do this
        setRefetch((refetch) => !refetch);
        console.log("Todo Updated successfully!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          onClick={reset}
          data-target={`#id${todo.todo_id}`}
        >
          Edit
        </button>

        <div className="modal" id={`id${todo.todo_id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={reset}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={onUpdate}
                >
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={reset}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodos;
