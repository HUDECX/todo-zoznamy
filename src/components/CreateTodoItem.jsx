import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, TextField } from '@mui/material';
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
  position: relative;
`;


const TodoItemText = styled(TextareaAutosize)`
  margin-top: 1rem;
  width: 100%;
  min-height: 8rem;
  background-color: #0e0c12;
  color: white;
`;

const RemoveTodoButton = styled(Button)`
  position: absolute!important;
  right: 1rem;
  bottom: 1rem;
  background-color: red!important;
`;

export default function CreateTodoItem({removeTodo ,getTodoData, id}) {

  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");

  useEffect(() => {


    const data = {
      id,
      todoTitle,
      todoText,
      todoDeadline
    };
    getTodoData(data);
  },[todoTitle,todoText,todoDeadline])


  return (
    <TodoItem>
        <TextField id="filled-basic" label="Todo title" variant="filled" value={todoTitle} onChange={(event) => setTodoTitle(event.target.value)}/>
        <TodoItemText aria-label="empty textarea" placeholder="Zadajte text pre toto Todo" value={todoText} onChange={(event) => setTodoText(event.target.value)} />
        <TextField
          id="date"
          label="Deadline"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, marginTop: "2rem" }}
          InputLabelProps={{
            shrink: true,
          }}
          value={todoDeadline} onChange={(event) => setTodoDeadline(event.target.value)}
        />
        <RemoveTodoButton variant='contained' onClick={() => removeTodo(id)}>X</RemoveTodoButton>
    </TodoItem>
  )
}
