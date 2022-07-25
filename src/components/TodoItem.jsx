import React, { useState } from 'react'
import styled from 'styled-components';

import { FormGroup, FormControlLabel } from '@mui/material';
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

export default function TodoItem({title="Dummy", description}) {

  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(prev => !prev);
  };


  return (
    <TodoItemContainer onClick={toggleCheck}>
        <TodoItemTitle>{title}</TodoItemTitle>
        
        <TodoItemDescription>{description}</TodoItemDescription>

        <FormGroup>
          <CheckBox control={<Checkbox checked={checked}/>} />
        </FormGroup>

    </TodoItemContainer>
  )
}
