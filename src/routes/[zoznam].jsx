import { useParams } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';
import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from "@mui/material/TextField";
import { SearchRounded } from "@mui/icons-material";

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
  left: 1rem;
  top: 1rem;
`;

const MarkAsCompletedButton = styled(Button)`
    // top: 3rem;
    // left: 15rem;
`;


const FilterButtons = styled(ToggleButton)`
    color: ${props => props.selected ? "blue!important" : "white!important"};
    border-color: white!important;
    display: inline-flex;
`;

const ZoznamNavigation = styled.div`
    display: flex;
    justify-content: space-around;
`;



export default function Zoznam({handleChange}) {

  let { zoznam } = useParams();
  const [loading, setLoading] = useState(true);
  const [usedZoznam, setUsedZoznam] = useState({});
  const [activeFilter, setActiveFilter] = useState("left");
  const [searchText, setSearchText] = useState("");

  // ziska data z api a a ked sa resolvne promise tak tak si ulozi index pozadovaneho zoznamu podla zoznam = useParams
  // a ulozi pozadovany zoznam do usedZoznam a vypne loading
  const getZoznamData = () => {
    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo") 
    .then(res => {
      const index = res.data.findIndex(todoZoznam => todoZoznam.zoznamTitle === zoznam);
      setUsedZoznam({...res.data[index]});
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  };

  // funkcia je na button ktory oznacuje cely zoznam ako completed
  // okopiruje cely zoznam a zneguje completed key aby sa to dalo prepinat 
  const markZoznamAsCompleted = () => {
    const newObj = {...usedZoznam, completed: !usedZoznam.completed};
    setUsedZoznam({...newObj})
  };

  // funkcia je passnuta ako prop do jednotlivych TodoItemov
  // okopiruje zoznam ktory sa pouziva, a prepise tam dany Todo item ktoreho checkbox bol zakliknuty
  const markTodoAsCompleted = (id, checked) => {
    const newObj = {...usedZoznam};
    newObj.todoItems[id].todoDone = checked;
    setUsedZoznam(newObj);
  };
  
  const changeFilter = (event, newFilter) => {
    newFilter && setActiveFilter(newFilter);
  };

  // vzdy ked sa zmeni prop(react-router) zo zoznam = useParams() tak sa zapne loading a fetchnu sa sa data pre dany zoznam
  useEffect(() => {
    setLoading(true);

    getZoznamData()

  },[zoznam]);

  // vzdy ked sa zmeni nieco v pouzivanom zozname a sa upravi aj na mockApi podla jeho ID, ale iba v pripade ze usedZoznam.id nieje undefined
  // aby sa zabranilo errorom
  useEffect(() => {
    
    usedZoznam.id && axios.put(`https://6288f3d010e93797c160f01a.mockapi.io/todo/${usedZoznam.id}`, {completed: usedZoznam.completed, todoItems: usedZoznam.todoItems})
                      .then(() => {
                        handleChange()
                      });

  },[usedZoznam])



  const searchFilter = item => {
    return item.filter(item => {
      if(searchText === ""){
        return item
      }else if(item.todoTitle.toLowerCase().includes(searchText.toLocaleLowerCase())){
        return item
      }
    })
  };



  return loading ? (
    <h1>loading - waiting for MockApi</h1>
    ) : (
      
      <TodoZoznamContainer>
        {/* nazov zoznamu */}
        <PageTitle>{zoznam}</PageTitle>
        <ZoznamNavigation>

          {/* label ci je zoznam completed alebo nie */}
          {usedZoznam.completed ? <CompletedTag completed={usedZoznam.completed}>Hotovo</CompletedTag> : <CompletedTag completed={usedZoznam.completed}>Treba spraviť</CompletedTag>}

          {/* button na oznacenie ze je zoznam completed */}
          <MarkAsCompletedButton onClick={markZoznamAsCompleted} variant="contained">Mark as completed</MarkAsCompletedButton>

          <TextField id="filled-basic" label="Filled" variant="filled" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>

          {/* button group na filtrovanie obsahu medzi All/Done/Active */}
          <ToggleButtonGroup
            value={activeFilter}
            exclusive
            onChange={changeFilter}
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
        </ZoznamNavigation>




        <TodoItemContainer>

          {/* nevyfiltrovany obsah */}
          {activeFilter === "left" && searchFilter(usedZoznam.todoItems).map(todo => 
            <TodoItem 
              key={todo.id}
              id={todo.id}
              title={todo.todoTitle} 
              description={todo.todoText} 
              deadline={todo.todoDeadline} 
              done={todo.todoDone}
              markTodoAsCompleted={markTodoAsCompleted}
            />)}

          {/* vyfiltrovany obsah - hotove Todo */}
          {activeFilter === "center" && searchFilter(usedZoznam.todoItems).filter(item => item.todoDone).map(todo => (
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

          {/* vyfiltrovany obsah - aktivne Todo */}
          {activeFilter === "right" && searchFilter(usedZoznam.todoItems).filter(item => !item.todoDone).map(todo => (
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


    </TodoZoznamContainer>
  )

}
