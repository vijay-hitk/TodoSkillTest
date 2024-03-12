
import './App.css';
import Header from './component/Header';
import Form from './component/Form';
import React,{ useState } from 'react';
import TodosList from './component/TodosList';

function App() {
  //intializing the necessary values 
  const [input , setInput] = useState("");
  const [todos , setTodos] = useState([]);
  const [editTodo , setEditTodo] = useState(null);


  return (
    <div className="container">
       <div><Header/></div>
       <div>
        <Form
          input={input}
          setInput={setInput}
          todos = {todos}
          setTodos= {setTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
      </div>
      <div className='app-wrapper'>
       
     
    
      <div>
        <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo}/>
      </div>
      </div>
     
    </div>
  );
}

export default App;
