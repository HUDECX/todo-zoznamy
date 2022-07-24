import React, { useState } from 'react'
import styled from 'styled-components';

import { Button, TextField } from '@mui/material';
import CreateTodoItem from '../components/CreateTodoItem';
import axios from 'axios';




const CreateTodoZoznamContainer = styled.div`
  height: 100vh;
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display:none;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
`;

const FormContainer = styled.form`
  text-align: center;
  background-color: #c1c8d9;
  flex: 1;
  padding: 2rem;
`;



const TodoItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AddTodoButton = styled(Button)`
  width: 10rem;
  margin-top: 3rem!important;
`;




export default function CreateTodoZoznam() {


  //prida novy todo do setTodoItems array
  const addTodo = () => {
    let copy = [...todoItems];   
    setCurrentId(prev => prev+1);
    copy.push({
      id: currentId,
      todoTitle: "",
      todoText: "",
      todoDeadline: ""
    }); 
    setTodoItems([...copy]) 
  };

  //ziska data z todoItemu
  const getTodoData = data => {
    const newArr = todoItems.map(todo => {
      if(todo.id === data.id){
        return {...data}
      }

      return todo
    })
    setTodoItems([...newArr])
    console.log(todoItems);
  };

  const removeTodo = id => {
    const newArr = [...todoItems];
    const indexToRemove = newArr.findIndex(todo => todo.id === id);
    newArr.splice(indexToRemove,1);
    setTodoItems([...newArr])
  };

  //odosle data na API
  const sendDataToApi = () => {
    const todoZoznam = {
      zoznamTitle: todoZoznamTitle,
      todoItems: {...todoItems}
    }
    axios.post("https://6288f3d010e93797c160f01a.mockapi.io/todo", todoZoznam)
  };


  const [currentId, setCurrentId] = useState(1);
  const [todoZoznamTitle, setTodoZoznamTitle] = useState("");

  const [todoItems,setTodoItems] = useState([
    {
      id: 0,
      title: "",
      text: "",
      deadline: ""
    }
  ]);




  return (
    <CreateTodoZoznamContainer>
      <PageTitle>Create your TODO</PageTitle>

      <FormContainer>

        <TextField id="filled-basic" label="Todo zoznam title" variant="filled" value={todoZoznamTitle} onChange={event => setTodoZoznamTitle(event.target.value)}/>

        <TodoItemsContainer>
          

          {todoItems.map(todo => <CreateTodoItem key={todo.id} getTodoData={getTodoData} id={todo.id} removeTodo={removeTodo}/>)}
          

        </TodoItemsContainer>

        <AddTodoButton variant="contained" onClick={addTodo}>Add todo</AddTodoButton>
        <AddTodoButton variant="contained" style={{display: "block"}} onClick={sendDataToApi}>Submit</AddTodoButton>

      </FormContainer>



    </CreateTodoZoznamContainer>
  )
}
