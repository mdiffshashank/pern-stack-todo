import React, { useState, useEffect } from "react";
import EditTodos from "./EditTodos";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onDelete = async (todoId) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("ToDo deleted successfully!");
        setTodos((todos) => todos.filter((todo) => todo.todo_id !== todoId));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodos todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      onDelete(todo.todo_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
