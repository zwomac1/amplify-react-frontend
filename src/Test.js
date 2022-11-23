import React, { useState } from 'react';
import './App.css';

function App() {
  const [Id, setId] = useState('');
  const [Todo, setTodo] = useState('');

  const setIdValue = (e) => {
    setId(e.target.value);
  };

  const setTodoValue = (e) => {
    setTodo(e.target.value);
  };

  const url = 'https://1841zlyb09.execute-api.us-east-1.amazonaws.com/todo';
  const header = { 'Content-Type': 'application/json' };

  const handleSubmit  = async(e) => {
    e.preventDefault();
    const data = { id: Id, todo: Todo };   
    await fetch(url,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.    
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: header,
      body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((response)=>{
        console.log('finish api call - response:::',response);
      }).catch((error)=>{
          console.log('something wrong:::',error);
      });   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={Id}
          onChange={setIdValue}
          name='Id'
          type='text'
        />
        <input
          value={Todo}
          onChange={setTodoValue}
          name='Todo'
          type='text' 
        />
        <button type='submit'>SEND</button>
      </form>
    </div>
  );
}

export default App;