import { useState } from "react";
import "./App.css";
import InputTodos from "./components/InputTodos_2";
import ListTodos from "./components/ListTodos";

function App() {
  const [refetch, setRefetch] = useState(false);

  return (
    <>
      <div className="container">
        <InputTodos setRefetch={setRefetch} />
        <ListTodos refetch={refetch} setRefetch={setRefetch} />
      </div>
    </>
  );
}

export default App;
