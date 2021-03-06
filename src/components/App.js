import React from "react";
import "./../styles/App.css";

function App() {
  let [textarea, setTextArea] = React.useState("");
  let [todos, setTodos] = React.useState([]);
  let [render, setRender] = React.useState(false);
  let [editIndex, setEditIndex] = React.useState(0);
  let [editText, setEditText] = React.useState("");

  function handleTextClick(event) {
    let str = event.target.value.toString();
    if (str.length === 0) return;
    setTextArea(event.target.value);
  }

  function handleEditText(event) {
    let str = event.target.value.toString();
    if (str.length === 0) return;
    setEditText(event.target.value);
  }

  function handleClick() {
    if (textarea) {
      let copyTodos = [...todos, textarea.trim()];
      setTodos(copyTodos);
      setTextArea("");
    }
  }

  function handleEdit(index) {
    setEditIndex(index + 1);
    setRender(true);
    setTextArea("");
  }

  function handleSave(event) {
    const str = editText;
    if (str.toString().length !== 0) {
      let arr = [];
      let el = "";
      todos.forEach((todo, index) => {
        if (index + 1 === editIndex) {
          el = editText;
        } else {
          el = todo;
        }
        arr.push(el);
      });
      setTodos(arr);
    }
    setRender(false);
    setEditText("");
  }

  function handleDelete(index) {
    let copyTodos = todos.filter((el, id) => {
      let first = "list" + (id + 1);
      let second = "list" + (index + 1);
      if (first !== second) {
        return el;
      }
    });
    setTodos(copyTodos);
  }

  /*if (render) {
    return (
      <>
        <h3>Edit</h3>
        <textarea
          className="editTask"
          type="text"
          value={textarea}
          onChange={handleTextClick}
        />
        <button className="saveTask" onClick={handleSave}>
          Save
        </button>
      </>
    );
  } else {*/

  return (
    <div id="main">
      <textarea
        id="task"
        type="text"
        value={textarea}
        onChange={handleTextClick}
      />
      <button id="btn" onClick={handleClick}>
        Add Todo
      </button>
      <h3>Add Todos</h3>
      <ul>
        {todos.map((todo, ind) => {
          return (
            <li
              key={"list" + (ind + 1)}
              id={"list" + (ind + 1)}
              style={{ listStyleType: "none" }}
              className="list"
            >
              <span style={{ marginRight: "10px" }}>{todo}</span>
              <button className="edit" onClick={() => handleEdit(ind)}>
                Edit
              </button>

              <button className="delete" onClick={() => handleDelete(ind)}>
                Delete
              </button>

              {render && ind + 1 === editIndex && (
                <>
                  <h3>Edit</h3>
                  <textarea
                    className="editTask"
                    type="text"
                    value={editText}
                    onChange={handleEditText}
                  />
                  <button className="saveTask" onClick={handleSave}>
                    Save
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
