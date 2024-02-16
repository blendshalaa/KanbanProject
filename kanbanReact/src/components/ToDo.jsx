import React, { useEffect, useState } from "react";
// Remove unused import: import '../App.css' - assumed you don't use it
import axios from 'axios';

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const[newTask,setNewTask]=useState('');
  const[isEditing,setIsEditing]=useState(false);
  const[editingTaskId,setEditingTaskId]=useState(null)

  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => setTodos(res.data))
      .catch(err => console.log('error fetching', err))
      .finally(() => setIsLoading(false)); // Set loading to false after fetching
  }, []);

  const handleDelete = (id) => {
    // Update the todos state to remove the task with the given ID
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos); // Update the state with the filtered array
    console.log('Task with ID', id, 'deleted locally'); // Log with correct string formatting
  };


 function handleAddTask(e){
    e.preventDefault();
    if(!newTask.trim()){
        alert('enter a valid task name')
        return;
    }
    const newTodo={
        id:Date.now(),
        title:newTask,
    };
    setTodos([...todos,newTodo]);
    setNewTask('')
 }

 function editTask(){

  



 }

  return (
    <div>
      <h1>Todo</h1>
      {loading ? (
        <p>Loading...</p> // Consistent loading message
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>

            </li>
          ))}
        </ul>
        
      )}
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="add a new task"
        id="new-task"
        value={newTask}
        onChange={(e)=>setNewTask(e.target.value)}
        required/>
        <button type="Submit">Add</button>
      </form>
    
    </div>
  );
}

export default ToDo;
