import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';


const NavbarContainer = styled.div`
  background-color: grey;
  margin: 0;
  padding: 2rem 0;
  min-flex: .1;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
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

export default function Navbar({change}) {


  const [navbarLinks,setNavbarLinks] = useState();
  const [helper, setHelper] = useState(true);  //toto je helper state aby sa vedel updatnut navbar po vytvoreni noveho zoznamu
                                            //alebo po oznaceni mark as completed

  useEffect(() => {
    setHelper(prev => !prev);
  },[change])

  //po vytvoreni noveho zoznamu alebo kliknuti mark as completed sa fetchnu data znovu aby sa vedeli updatnut farby navbaru
  useEffect(() => {
    axios.get("https://6288f3d010e93797c160f01a.mockapi.io/todo")
      .then(res => {
        setNavbarLinks(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },[helper])

  return (
    <NavbarContainer>

      <Link to="/createTodoZoznam"><Button variant='contained'><AddIcon /></Button></Link>
      
      <NavbarList>

        {!navbarLinks && <div>loading</div>}

        {navbarLinks && navbarLinks.map(link =>
          <NavbarLink
            key={link.id}
            to={`/${link.zoznamTitle}`}
            text={link.zoznamTitle}
            completed={link.completed}
          />)}

      </NavbarList>
    </NavbarContainer>
  )
}
