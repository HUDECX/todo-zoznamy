import { useParams } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';
import { Button } from '@mui/material';

const TodoZoznamContainer = styled.div`
    height: 100vh;
    flex: 1;
    position: relative;
`;

const PageTitle = styled.h1`
    text-align: center;
`;

const TodoItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CompletedTag = styled.div`
  background-color: ${props => props.completed ? "green" : "red"};
  padding: 2rem;
  border-radius: 2rem;
  display: inline-block;
  position: absolute;
  left: 1rem;
  top: 1rem;
`;


export default function Zoznam() {

  const getZoznamData = () => {
    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo") 
    .then(res => {
      setVsetkyZoznamy([...res.data])
      const index = res.data.findIndex(todoZoznam => todoZoznam.zoznamTitle === zoznam);
      setUsedZoznam({...res.data[index]});
      setActiveIndex(index);
      setLoading(false);
    })
  };

  const markAsCompleted = () => {
    const newObj = {...usedZoznam, completed: !usedZoznam.completed};
    setUsedZoznam({...newObj})
    console.log(`toto je newObj: ${JSON.stringify(newObj)}`);
  };

  let { zoznam } = useParams();



  const [loading, setLoading] = useState(true);
  const [usedZoznam, setUsedZoznam] = useState({});
  const [vsetkyZoznamy, setVsetkyZoznamy] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    getZoznamData();

  },[zoznam]);

  useEffect(() => {
    axios.put(`https://6288f3d010e93797c160f01a.mockapi.io/todo/${usedZoznam.id}`, {completed: usedZoznam.completed})
  },[usedZoznam])

  


  return loading ? (
    <div>loading</div>
  ) : (

    <TodoZoznamContainer>
        <PageTitle>{zoznam}</PageTitle>
        {usedZoznam.completed ? <CompletedTag completed={usedZoznam.completed}>Hotovo</CompletedTag> : <CompletedTag completed={usedZoznam.completed}>Treba spraviť</CompletedTag>}


        <TodoItemContainer>
          
          {usedZoznam.todoItems.map(todo => <TodoItem key={todo.id} title={todo.todoTitle} description={todo.todoText} deadline={todo.todoDeadline}/>)}
          
        </TodoItemContainer>

        <Button onClick={markAsCompleted} variant="contained">Mark as completed</Button>

        <Button onClick={() => console.log(usedZoznam.id)}>talc</Button>

    </TodoZoznamContainer>
  )

}
