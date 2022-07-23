import React from 'react'
import styled from 'styled-components';

import { CheckBox } from '@mui/icons-material';
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
`;

const TodoItemTitle = styled.h2`
    text-align: center;
`;

const TodoItemDescription = styled.p`
    word-wrap: break-word;
`;

export default function TodoItem({title="Dummy", description}) {
  return (
    <TodoItemContainer>
        <TodoItemTitle>{title}</TodoItemTitle>
        
        <TodoItemDescription>{description}</TodoItemDescription>

        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} />
        </FormGroup>

    </TodoItemContainer>
  )
}
