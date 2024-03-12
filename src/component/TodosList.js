import React ,{useEffect} from 'react';

const TodosList = ({todos,setTodos, setEditTodo}) => {

    //to show todo on initial rendering
    useEffect(() =>{
        fetchTodos();
    },[]);

    //Fetching todo items from the api 
    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
              .then(data => {
                  setTodos(data);
                  
              })
              .catch(error=>{
                  alert('An error occurred' + error);
                 
              })
  
  }
  
//deleting the todo item with DELETE method
    const handleDelete = async (id) => {
        try{
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
               method : 'DELETE',
              
            });

         //Deleting the todo state by filtering the todo 
        setTodos(todos.filter((todo) => todo.id !== id ))

    }catch(error){
        console.log(error);

        }
    }

//toggling the completed value to show or hide completion status 
    const handleComplete = (todo) => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return {...item , completed : !item.completed }
            }
            return item;
        }))
    }


    //updating the todo
    const handleUpdate = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
}


  return (
    <div>
        {/* listing all the todo */}
        {todos.map((todo) => (
            <li className='list-item' key={todo.id}> 
                <input type='text' 
                    value={todo.title}
                    className={`list ${todo.completed ? "complete" : "" }`}
                    onChange={(event) => event.preventDefault()}
                />
                <div>
                    {/*  show completion button */}
                    <button className='button-complete task-button ' onClick={() => handleComplete(todo)}>
                        <i className='fa fa-check-circle'></i>
                    </button>
                        {/* Edit button */}
                    <button className='button-edit task-button' onClick={() => handleUpdate(todo)}>
                        <i className='fa fa-edit'></i>
                    </button>
                        {/* delete button  */}
                    <button className='button-delete task-button' onClick={() => handleDelete(todo.id)}>
                    <i className="fa fa-trash"></i>
                    </button>
                </div>

            </li>
        )

        )}
    </div>
  )
}

export default TodosList;