import { useParams } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';
import { Button } from '@mui/material';

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


export default function Zoznam() {

  let { zoznam } = useParams();



  const [loading, setLoading] = useState(true);
  const [usedZoznam, setUsedZoznam] = useState({});

  useEffect(() => {
    setLoading(true);

    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo") 
    .then(res => {
      const index = res.data.findIndex(todoZoznam => todoZoznam.zoznamTitle === zoznam);
      setUsedZoznam({...res.data[index]});
      setLoading(false);
    })

  },[zoznam]);

  return loading ? (
    <div>loading</div>
  ) : (

    <TodoZoznamContainer>
        <PageTitle>{zoznam}</PageTitle>


        <TodoItemContainer>
          
          {usedZoznam.todoItems.map(todo => <TodoItem key={usedZoznam.id} title={todo.todoTitle} description={todo.todoText} />)}
          
        </TodoItemContainer>

        <Button onClick={() => console.log(usedZoznam)}>talc</Button>

    </TodoZoznamContainer>
  )

}
