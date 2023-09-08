import React, { useState } from 'react';
import '../Styling/Main.css';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={handleTaskInputChange}
          autoFocus
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className='err-msg'>No tasks added yet!</p>
        ) : (
          tasks.map((task, i) => (
            <div className="task-card" key={i}>
              <p>{i+1 +".  "+task}</p>
              <button onClick={() => handleRemoveTask(i)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Main
