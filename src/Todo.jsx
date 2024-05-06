
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
  const [toDo, setToDo] = useState([{ task: "New task", id: uuidv4(), state: false }]);
  const [newToDo, setNewToDo] = useState("");
  const [draggedItemId, setDraggedItemId] = useState(null);

  function click() {
    if (!newToDo.trim()) {
      return; // Ignore empty task input
    }
  
    setToDo(prev => {
      if (prev.length === 1 && prev[0].task === "New task") {
        return [{ task: newToDo, id: uuidv4(), state: false }];
      } else {
        return [...prev, { task: newToDo, id: uuidv4(), state: false }];
      }
    });
    console.log(toDo);
    setNewToDo("");
  }
  

  function change(e) {
    setNewToDo(e.target.value);
  }

  function deleteToDo(id) {
    let copy = toDo.filter((todos) => todos.id !== id);
    setToDo(copy);
  }

  function complete() {
    setToDo((todos) => todos.map((todo) => ({ ...todo, state: true })));
  }

  function completeOne(id) {
    setToDo((todos) => todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, state: true };
      } else {
        return todo;
      }
    }));
  }

  function handleDragStart(e, id) {
    setDraggedItemId(id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, id) {
    e.preventDefault();
    if (draggedItemId === id) return;

    const updatedTodoList = [...toDo];
    const draggedItemIndex = toDo.findIndex(todo => todo.id === draggedItemId);
    const droppedItemIndex = toDo.findIndex(todo => todo.id === id);

    const draggedItem = updatedTodoList[draggedItemIndex];
    updatedTodoList.splice(draggedItemIndex, 1);
    updatedTodoList.splice(droppedItemIndex, 0, draggedItem);

    setToDo(updatedTodoList);
  }


  function handleKeyPress(e) {
    if (e.key === "Enter") {
      click(); // Call the click function to add the task
    }
  }
  
  return (
    <div>
      <input style={{ height: "20px", width: "200px" }} placeholder="Type here" value={newToDo} onChange={change} onKeyPress={handleKeyPress}></input><br /><br />
      <button onClick={click}>Add Task</button>
      <br /><br /><br />

      <hr />
      <h2>Todo Tasks</h2>

      <ul>
        {toDo.map((element) => (
          <li style={{lineHeight: "50px"}} key={element.id} onDragStart={(e) => handleDragStart(e, element.id)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, element.id)} draggable>
            <span style={element.state ? { textDecorationLine: "line-through" } : {}}>{element.task}</span>
            &nbsp; &nbsp; &nbsp;
            <button onClick={() => deleteToDo(element.id)}>Delete</button>
            &nbsp; &nbsp;
            <button onClick={() => completeOne(element.id)}>Complete Task</button>
          </li>
        ))}
      </ul>
      &nbsp; &nbsp; <br /><br />
      <button onClick={complete}>All tasks completed</button>
    </div>
  );
}

export { Todo };
