import React, { useState } from "react";

const InputTodos = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (res.ok) {
        console.log("ToDo Added successfully!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control mr-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success px-4">Add</button>
      </form>
    </>
  );
};

export default InputTodos;
