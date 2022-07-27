import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const NavbarItem = styled.li`
  padding: 1rem;
  text-decoration: none;
`;


const NavbarAnchor = styled(Link)`
  text-decoration: none;
  color: ${props => props.completed ? "green" : "red"};
  background-color: black;
  padding: .5rem;
  border-radius: 1rem;
  &:hover{
    border: 1px solid ${props => props.completed ? "green" : "red"};
  }
`;

export default function NavbarLink({text,to, completed}) {
  return (
    <NavbarItem>
      <NavbarAnchor completed={completed} to={to}>{text}</NavbarAnchor>
    </NavbarItem>
  )
}
