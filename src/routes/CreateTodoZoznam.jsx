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
  
  const CreateTodoButton = styled(Button)`
  width: 10rem;
  margin-top: 3rem!important;
`;




export default function CreateTodoZoznam({handleChange}) {
  
  const [currentId, setCurrentId] = useState(1);
  const [todoZoznamTitle, setTodoZoznamTitle] = useState("");
  const [todoItems,setTodoItems] = useState([
    {
      id: 0,
      todoTitle: "",
      todoText: "",
      todoDeadline: "",
      todoDone: false
    }
  ]);


  //funkcia prida novy todo do todoItems, zvysi aktualne pouzity index o 1
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

  //funkcia je passnuta do jednotlivych todoItemov, oni vratia svoje udaje v data
  // dalej potom vytvorime novu array kde najdeme ci todo existuje pomocou todo.id a ak ano tak ho prepiseme novymi hodnotami
  // ak nie tak vrati nove hodnoty, a nakoniec updatneme state todoItems
  const getTodoData = data => {
    const newArr = todoItems.map(todo => {
      if(todo.id === data.id){
        return {...data}
      }

      return todo
    })
    setTodoItems([...newArr])
  };

  // funkcia je passnuta to todoItemu, ak ma byt vymazany vrati id itemu ktory treba vymazat
  // pomocou findIndex najdeme index toho itemu a pomocou splice ho vymazeme
  // novu array vlozime do todoItems statu
  const removeTodo = id => {
    const newArr = [...todoItems];
    const indexToRemove = newArr.findIndex(todo => todo.id === id);
    newArr.splice(indexToRemove,1);
    setTodoItems([...newArr])
  };

  //po kliknuti na submit vytvori strukturu, a potom posle tie data na MockApi
  // na konci refreshne stranku aby sa natiahli udaje do navbaru s novym zoznamom
  const sendDataToApi = () => {
    const todoZoznam = {
      zoznamTitle: todoZoznamTitle,
      completed: false,
      todoItems: [...todoItems]
    }
    axios.post("https://6288f3d010e93797c160f01a.mockapi.io/todo", todoZoznam)
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        handleChange();
      })

  };

  return (
    <CreateTodoZoznamContainer>
      {/* nadpis stranky pre vytvaranie todo zoznamov */}
      <PageTitle>Create your TODO</PageTitle>

      {/* zaciatok formulara */}
      <FormContainer>

        {/* text field pre zoznam title */}
        <TextField id="filled-basic" label="Todo zoznam title" variant="filled" value={todoZoznamTitle} onChange={event => setTodoZoznamTitle(event.target.value)}/>

        {/* sem sa vkladaju vsetky todo itemy na vytvorenie */}
        <TodoItemsContainer>
          
          {/* todo itemy */}
          {todoItems.map(todo => <CreateTodoItem key={todo.id} getTodoData={getTodoData} id={todo.id} removeTodo={removeTodo}/>)}
          

        </TodoItemsContainer>

        {/* prida dalsie todo */}
        <CreateTodoButton variant="contained" onClick={addTodo}>Add todo</CreateTodoButton>
        {/* odosle zoznam na MockApi */}
        <CreateTodoButton variant="contained" style={{display: "block"}} onClick={sendDataToApi}>Submit</CreateTodoButton>

      </FormContainer>



    </CreateTodoZoznamContainer>
  )
}
