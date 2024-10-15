const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //from req.body

//routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newToDo = await pool.query(
      "INSERT INTO  todo (description) values($1) RETURNING *",
      [description]
    );
    res.json(newToDo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all todo
app.get("/todos", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM todo");
    res.json(all.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]); //return
  } catch (error) {
    console.log(error.message);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;

    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo is updated successfully!");
  } catch (error) {
    console.log(error.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query("DELETE from todo WHERE todo_id =$1", [
      id,
    ]);
    res.json("Todo was deleted.");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4000, () => {
  console.log("Server listening at port 4000");
});
