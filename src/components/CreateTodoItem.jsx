import React from 'react';
import styled from 'styled-components';

import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const TodoItem = styled.div`
  background-color: rgba(0, 0, 0, 0.39);
  display: inline-block;
  width: 30rem;
  min-height: 20rem;
  margin-top: 2rem;
  border-radius: 2rem;
  padding: 2rem;
  border: 3px solid black;
`;


const TodoItemText = styled(TextareaAutosize)`
  margin-top: 1rem;
  width: 100%;
  min-height: 8rem;
  background-color: #0e0c12;
  color: white;
`;

export default function CreateTodoItem() {
  return (
    <TodoItem>
        <TextField id="filled-basic" label="Todo title" variant="filled" />
        <TodoItemText aria-label="empty textarea" placeholder="Zadajte text pre toto Todo" />
        <TextField
          id="date"
          label="Deadline"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, marginTop: "2rem" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
    </TodoItem>
  )
}
