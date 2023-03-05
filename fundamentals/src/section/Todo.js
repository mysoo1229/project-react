import { useState } from "react";

function Todo() {
  const [userInput, getUserInput] = useState("");
  const getTodo = (e) => getUserInput(e.target.value);

  const [todoArray, setTodoArray] = useState([]);
  const addTodo = (e) => {
    e.preventDefault();

    if (userInput === "") {
      return;
    }

    setTodoArray((current) => [...current, userInput]);
    getUserInput("");
  };

  return (
    <section className="sectionTodo">
    <h2>My To-Do List ({todoArray.length})</h2>
    <form onSubmit={addTodo}>
      <input
        type="text"
        value={userInput}
        onChange={getTodo}
      />
      <button>Add</button>
    </form>
    <ul>
      {todoArray.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </section>
  );
}

export default Todo;
