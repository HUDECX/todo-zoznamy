import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const TodoZoznamContainer = styled.div`
    height: 100vh;
    flex: 1;
`;

const PageTitle = styled.h1`
    text-align: center;
`;

const TodoItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;






export default function TodoZoznam() {



  const [todoZoznamy, setTodoZoznamy] = useState(0);
  const [notLoading, setNotLoading] = useState(false);

  useEffect(() => {
    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo")
    .then(res => {
      setNotLoading(true);
      setTodoZoznamy({...res.data[0]})
    })

  },[]);

  



  return (
    <TodoZoznamContainer>
        <PageTitle>{todoZoznamy.zoznamTitle}</PageTitle>


        <TodoItemContainer>
          
          <TodoItem title={"Toto je dummy title"} description={"Toto je dummy text. Toto je dummy text. Toto je dummy text. Toto je dummy text. Toto je dummy text."}/>

          {notLoading && todoZoznamy.todoItems.map(item => <TodoItem title={item.todoTitle} description={item.todoText} />)}
        </TodoItemContainer>

        <Button onClick={() => console.log(todoZoznamy)}>talc</Button>

    </TodoZoznamContainer>
  )
}
