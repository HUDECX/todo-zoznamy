import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const NavbarItem = styled.li`
  padding: 1rem;
  text-decoration: none;
`;


const NavbarAnchor = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover{
    text-decoration: underline;
  }
`;

export default function NavbarLink({text,to}) {
  return (
    <NavbarItem>
      <NavbarAnchor to={to}>{text}</NavbarAnchor>
    </NavbarItem>
  )
}
