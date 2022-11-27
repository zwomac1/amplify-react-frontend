import React, { useState } from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [Id, setId] = useState('');
  const [Todo, setTodo] = useState('');
  const [Complete, setComplete] = useState(false);

  const setCompleteValue = (e) => {
    setComplete(e.target.value);
  };

  const setIdValue = (e) => {
    setId(e.target.value);
  };

  const setTodoValue = (e) => {
    setTodo(e.target.value);
  };

  const url = 'https://1841zlyb09.execute-api.us-east-1.amazonaws.com/todo';
  const header = { 'Content-Type': 'application/json'};

  const handleCreate  = async(e) => {
    e.preventDefault();
    const data = { id: Id, todo: Todo };   
    console.log('Data:', data);
    await fetch(url,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.    
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: header,
      body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((response)=>{
        console.log('finish api call - ADDed TODO:::',response);
      }).catch((error)=>{
          console.log('something wrong:::',error);
      }); 
       
  };
  const handleUpdate  = async(e) => {
    e.preventDefault();
    const urlUpdate = 'https://1841zlyb09.execute-api.us-east-1.amazonaws.com/todo/'.concat(Id);
    const data = { completed: Complete };   
    console.log('Data:', data);
    await fetch(urlUpdate,{
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.    
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: header,
      body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((response)=>{
        console.log('finish api call - Updated TODO:::',response);
      }).catch((error)=>{
          console.log('something wrong:::',error);
      }); 
       
  };
  const handleDelete  = async(e) => {
    e.preventDefault();
    const urlDelete = 'https://1841zlyb09.execute-api.us-east-1.amazonaws.com/todo/'.concat(Id); 
    await fetch(urlDelete,{
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.    
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: header,
      }).then((response)=>{
        console.log('finish api call - Deleted TODO:::',response);
      }).catch((error)=>{
          console.log('something wrong:::',error);
      }); 
       
  };

   const retrieveTODOs = async(e) => {
     e.preventDefault(); 
     await fetch(url,{
       method: 'GET', // *GET, POST, PUT, DELETE, etc.    
       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
       headers: header
       }).then((response)=>{
         console.log('finish api call - List TODOs:::',response.json());
       }).catch((error)=>{
           console.log('something wrong:::',error);
       });     
   }

   const retrieveTODO = async(e) => {
    e.preventDefault(); 
    const urlRetrieve = 'https://1841zlyb09.execute-api.us-east-1.amazonaws.com/todo/'.concat(Id);
    await fetch(urlRetrieve,{
      method: 'GET', // *GET, POST, PUT, DELETE, etc.    
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: header
      }).then((response)=>{
        console.log('finish api call - List TODOs:::',response.json());
      }).catch((error)=>{
          console.log('something wrong:::',error);
      });     
   } 



  return (
    <div className='App-header'>
      <h1 className='title'>Create Todo</h1>

      <Form onSubmit={handleCreate}>
        ID: <input 
          onChange={setIdValue}
          name='Id'
          type='text'
        />
        <br/>Desc: <input
          onChange={setTodoValue}
          name='Todo'
          type='text' 
        />
        <br/><Button type='submit'>Create</Button>
        </Form>

        <h1 className='title'>Update Todo</h1>

        <Form onSubmit={handleUpdate}>
        ID: <input 
          onChange={setIdValue}
          name='IdUpdate'
          type='text'
        />
        <br/>
        <input type="radio" id="true" name="isCompleted" value="True" onChange={setCompleteValue}/>
        <label htmlFor="True">True</label><br/>
        <input type="radio" id="false" name="isCompleted" value="False" onChange={setCompleteValue}/>
        <label htmlFor="False">False</label><br></br>
        <Button className='' type='submit'>Update</Button>
        </Form>

        <h1 className='title'>Delete Todo</h1>

        <Form className='' onSubmit={handleDelete}>
        ID: <input 
          onChange={setIdValue}
          name='Id'
          type='text'
        />
        <br/>
        <Button className='' type='submit'>Delete</Button>
        </Form>

        <h1 className='title'>Get Todo</h1>

        <Form onSubmit={retrieveTODO}>
        ID: <input 
          onChange={setIdValue}
          name='Id'
          type='text'
        />
        <br/>
        <Button className='' type='submit'>Retrieve</Button>
        </Form>
        <h1 className='title'>Get All Todos</h1>
        <Button className='' type='button' onClick={retrieveTODOs}>Retrieve All</Button>        
        
        

    </div>
  );
}

export default App;