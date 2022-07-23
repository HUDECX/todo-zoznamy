import React from 'react'
import styled from 'styled-components';

import { TextField } from '@mui/material';
import CreateTodoItem from '../components/CreateTodoItem';




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




export default function CreateTodoZoznam() {
  return (
    <CreateTodoZoznamContainer>
      <PageTitle>Create your TODO</PageTitle>

      <FormContainer>

        <TextField id="filled-basic" label="Todo zoznam title" variant="filled" />

        <TodoItemsContainer>
          
          
          <CreateTodoItem />
          <CreateTodoItem />
          <CreateTodoItem />
          <CreateTodoItem />
          <CreateTodoItem />
          <CreateTodoItem />


        </TodoItemsContainer>


      </FormContainer>


    </CreateTodoZoznamContainer>
  )
}
