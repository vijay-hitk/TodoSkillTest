import React, { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

const Form = ({input , setInput , todos , setTodos , editTodo , setEditTodo}) => {


    const updateTodo = async (title , id , completed) => {
         const newTodo = todos.map((todo) => 
                 todo.id === id ? { title , id , completed} : todo
                 )
                try{
                    //send a PUT request to update the todo
                    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                        method: 'PUT',
                        headers:{
                            'content-type' : 'application/json'
                        },
                        body: JSON.stringify(newTodo)
                    })
                    //update the todo state with updated state
                    setTodos(newTodo);
                    setEditTodo("");
                  
            
                } catch(error){
                    console.log(error);
                }
           

}

useEffect(() => {
    if(editTodo){
        setInput(editTodo.title);
    }else {
        setInput("");
    }
},[setInput,editTodo]);

//setting the input value on change of it's value
const onInputChange = (event) => {
    setInput(event.target.value);
};

//on form submit , Add todo or update todo function are added
const onFormSubmit = async (event) => {
    event.preventDefault();
    if(!editTodo ){

        const newTodo = {
            id : uuidv4(), //adding universally unique identifier
            title : input, 
            completed : false 
        }
        try{
            //send a POST request to the api to add a todo
            const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(newTodo)
            });
            const data = await response.json();
        
            //update the todos state with new todos.
            setTodos([ newTodo , ...todos ]);
            setInput("");
          
        }catch(error){
            console.log(error);
        }
        
        

    }else {
        //calling the updateTodo function for updating todo if "editTodo" is true
        updateTodo(input , editTodo.id , editTodo.completed); 
    }
    

}

  return (
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder='Enter a Todo...' className='task-input' value = {input} onChange={onInputChange}/>
                <button className='button-add' type='submit'>{editTodo ? 'Update' : 'Add'}</button>

            </form>
  )
}

export default Form;