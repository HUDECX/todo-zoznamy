import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import TodoItem from '../components/TodoItem';


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

  



  return (
    <TodoZoznamContainer>
        <PageTitle>Todo zoznam</PageTitle>


        <TodoItemContainer>
          
          <TodoItem title={"Toto je dummy title"} description={"Toto je dummy text. Toto je dummy text. Toto je dummy text. Toto je dummy text. Toto je dummy text."}/>

        </TodoItemContainer>

    </TodoZoznamContainer>
  )
}
