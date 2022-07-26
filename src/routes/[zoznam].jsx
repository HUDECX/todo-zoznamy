import { useParams } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';
import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { act } from "react-dom/test-utils";

const TodoZoznamContainer = styled.div`
    height: 100vh;
    flex: 1;
    position: relative;
    overflow: scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none; 
    &::-webkit-scrollbar{
      display: none;
    }
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

const MarkAsCompletedButton = styled(Button)`
    position: absolute!important;
    top: 3rem;
    left: 15rem;
`;


const FilterButtons = styled(ToggleButton)`
    color: ${props => props.selected ? "blue!important" : "white!important"};
    border-color: white!important;
`;



export default function Zoznam() {

  const getZoznamData = () => {
    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo") 
    .then(res => {
      const index = res.data.findIndex(todoZoznam => todoZoznam.zoznamTitle === zoznam);
      setUsedZoznam({...res.data[index]});
      setLoading(false);
    })
  };

  const markZoznamAsCompleted = () => {
    const newObj = {...usedZoznam, completed: !usedZoznam.completed};
    setUsedZoznam({...newObj})
    console.log(`toto je newObj: ${JSON.stringify(newObj)}`);
  };

  const markTodoAsCompleted = (id, checked) => {
    const newObj = {...usedZoznam};
    newObj.todoItems[id].todoDone = checked;
    setUsedZoznam(newObj);
  };
  

  let { zoznam } = useParams();



  const [loading, setLoading] = useState(true);
  const [usedZoznam, setUsedZoznam] = useState({});
  const [activeFilter, setActiveFilter] = useState("left");

  useEffect(() => {
    setLoading(true);

    getZoznamData();

  },[zoznam]);

  useEffect(() => {
    axios.put(`https://6288f3d010e93797c160f01a.mockapi.io/todo/${usedZoznam.id}`, {completed: usedZoznam.completed, todoItems: usedZoznam.todoItems})
  },[usedZoznam])


  const handleAlignment = (event, newAlignment) => {
    newAlignment && setActiveFilter(newAlignment);
  };




  return loading ? (
    <div>loading</div>
    ) : (
      
      <TodoZoznamContainer>
        <PageTitle>{zoznam}</PageTitle>
        {usedZoznam.completed ? <CompletedTag completed={usedZoznam.completed}>Hotovo</CompletedTag> : <CompletedTag completed={usedZoznam.completed}>Treba spraviť</CompletedTag>}
        <MarkAsCompletedButton onClick={markZoznamAsCompleted} variant="contained">Mark as completed</MarkAsCompletedButton>

        <ToggleButtonGroup
          value={activeFilter}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{position: "absolute", right: "15rem", top: "3rem"}}
        >
          <FilterButtons value="left" aria-label="left aligned">
            All
          </FilterButtons>
          <FilterButtons value="center" aria-label="centered">
            Done
          </FilterButtons>
          <FilterButtons value="right" aria-label="right aligned">
            Active
          </FilterButtons>
          
        </ToggleButtonGroup>


        <TodoItemContainer>

          
          {activeFilter === "left" && usedZoznam.todoItems.map(todo => 
            <TodoItem 
              key={todo.id}
              id={todo.id}
              title={todo.todoTitle} 
              description={todo.todoText} 
              deadline={todo.todoDeadline} 
              done={todo.todoDone}
              markTodoAsCompleted={markTodoAsCompleted}
            />)}

            {activeFilter === "center" && usedZoznam.todoItems.filter(item => item.todoDone).map(todo => (
              <TodoItem 
              key={todo.id}
              id={todo.id}
              title={todo.todoTitle} 
              description={todo.todoText} 
              deadline={todo.todoDeadline} 
              done={todo.todoDone}
              markTodoAsCompleted={markTodoAsCompleted}
            />
            ))}

            {activeFilter === "right" && usedZoznam.todoItems.filter(item => !item.todoDone).map(todo => (
              <TodoItem 
              key={todo.id}
              id={todo.id}
              title={todo.todoTitle} 
              description={todo.todoText} 
              deadline={todo.todoDeadline} 
              done={todo.todoDone}
              markTodoAsCompleted={markTodoAsCompleted}
            />
            ))}

            


          
        </TodoItemContainer>


        <Button onClick={() => console.log(usedZoznam)}>talc</Button>

    </TodoZoznamContainer>
  )

}
