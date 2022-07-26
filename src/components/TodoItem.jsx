import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


const TodoItemContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.39);
  display: inline-block;
  width: 30rem;
  min-height: 20rem;
  margin-top: 2rem;
  border-radius: 2rem;
  padding: 2rem;
  border: 3px solid black;
  cursor: pointer;
  transition: border-color .2s ease-in-out; 
  &:hover{
    border-color: white;
  }
`;

const TodoItemTitle = styled.h2`
    text-align: center;
`;

const TodoItemDescription = styled.p`
    word-wrap: break-word;
`;

const TodoDeadline = styled.p`
  background-color: black;
  display: inline-block;
  padding: 1rem;
  border-radius: 2rem;
`;

const CheckBox = styled(FormControlLabel)`
  display: inline;
  .MuiFormGroup-root .css-dmmspl-MuiFormGroup-root{
    display: inline-flex!important;
  }
  .Mui-checked{
    color: white!important;
    fill: white!important;
  }
  
`;



export default function TodoItem({title="Dummy", description, deadline, done, id, markTodoAsCompleted}) {


  const [checked, setChecked] = useState(done);

  // oznaci item ako hotovy
  const toggleCheck = () => {
    setChecked(prev => !prev);
  };

  // po zmene itemu na hotovy posle na [zoznam] zmenu
  useEffect(() => {
    markTodoAsCompleted(id, checked)
  },[checked])


  return (
    <TodoItemContainer onClick={toggleCheck}>
        <TodoItemTitle>{title}</TodoItemTitle>
        
        <TodoItemDescription>{description}</TodoItemDescription>

        {deadline && <TodoDeadline>{deadline}</TodoDeadline>}
        <CheckBox control={<Checkbox checked={checked} />} />

    </TodoItemContainer>
  )
}
