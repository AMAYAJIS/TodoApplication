import React, { useState } from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import {AddTodoAction} from "./actions/TodoActions"
import {RemoveTodoAction} from "./actions/TodoActions"
import {ToggleTodoAction} from "./actions/TodoActions"
import {EditTodoAction} from "./actions/TodoActions"
import './App.css';

function App() {
  const [todo,setTodo] =useState();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const dispatch = useDispatch();
  const Todo = useSelector((state)=> state.Todo);
  const { todos } = Todo;
   const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddTodoAction(todo));
  };
  const removeHandler = (t) =>{
   dispatch(RemoveTodoAction(t));
  };

  const toggleDoneHandler = (t) => {
   dispatch(ToggleTodoAction(t.id));
};
const handleEditSubmit = (e, todoId) => {
    e.preventDefault();
    dispatch(EditTodoAction(todoId, editValue));
    console.log("Dispatched edit action for todoId:", todoId, "with new value:", editValue);
    setEditingId(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Todo List App in Redux</h2>
        <form onSubmit={handleSubmit}>
         <input placeholder="Enter a todo" style={{width: 350,
                                                   padding:10,
                                                   borderRadius:20,
                                                   border:"none",
                                                   fontsize:20}}
          onChange={(e) => setTodo(e.target.value)} />
        <button type="submit" style={{padding:20,
                                      borderRadius:25,
                                      fontSize:15,
                                      marginLeft:20}}>Add</button>
        </form>

        <ul className= "alltasks">
        {
          
          todos && todos.map((t)=>(
        <li key={t.id} className= "single-task">
        <input type="checkbox" checked={t.isDone} onChange={() => toggleDoneHandler(t)} />
        {
          editingId === t.id ? (
          <form onSubmit={(e) => handleEditSubmit(e, t.id)}>
          <input 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => setEditingId(null)}
          />
          </form>
          ) : (
          <>
        <span className= "task-desc"
         style={{ textDecoration: t.isDone ? 'line-through' : 'none' }}
         >{t.todo}</span>

          {/* The new "Edit" button */}
            <button 
              style={{
                borderRadius: 25,
                padding: 10,
                marginRight: 10, // Added some margin for visual separation
                border: "1px solid white",
                color: "white",
                backgroundColor: "blue" // Different color to distinguish from "Delete"
              }}
              onClick={() => {
                setEditingId(t.id);
                setEditValue(t.todo);
              }}
            >
              Edit
            </button>

        <button style = {{borderRadius:25,
                          padding:10,
                          border:"1px solid white",
                          color:"white",
                          backgroundColor:"green"}}
                          onClick = {()=>{removeHandler(t)}}
                          >Delete</button>
        </>
        )
      }
      
        </li>
        
        ))}
        
        </ul>
      </header>
    </div>
  );
}

export default App;
