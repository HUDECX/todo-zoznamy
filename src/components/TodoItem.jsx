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



export default function TodoItem({title="Dummy", description, deadline}) {



  return (
    <TodoItemContainer>
        <TodoItemTitle>{title}</TodoItemTitle>
        
        <TodoItemDescription>{description}</TodoItemDescription>

        {deadline && <TodoDeadline>{deadline}</TodoDeadline>}

    </TodoItemContainer>
  )
}
