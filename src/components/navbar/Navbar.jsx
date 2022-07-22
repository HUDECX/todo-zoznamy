import React from 'react'
import styled from 'styled-components'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';


const NavbarContainer = styled.div`
  background-color: grey;
  margin: 0;
  padding: 0;
  flex: .1;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

const NavbarList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  display: flex;
  flex-flow: column;
  margin: 0;
  padding: 0;
  justify-content: start;
  align-items: center;
  height: 100%;
`;

const NavbarItem = styled.li`
  padding: 1rem;
  text-decoration: none;
`;


const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover{
    text-decoration: underline;
  }
`;


export default function Navbar() {
  return (
    <NavbarContainer>

      <Button variant='contained'><AddIcon /></Button>

      <NavbarList>

        <NavbarItem>
          <NavbarLink to='/'>aaaaa</NavbarLink>
        </NavbarItem>

        <NavbarItem>
          <NavbarLink to='/createTodoZoznam'>bbbbb</NavbarLink>
        </NavbarItem>

        <NavbarItem>
          <NavbarLink to='/'>ccccc</NavbarLink>
        </NavbarItem>

        <NavbarItem>
          <NavbarLink to='/'>ddddd</NavbarLink>
        </NavbarItem>

        <NavbarItem
        ><NavbarLink to='/'>eeeee</NavbarLink>
      </NavbarItem>

      </NavbarList>
    </NavbarContainer>
  )
}
