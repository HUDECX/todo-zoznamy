import React from 'react'
import styled from '@emotion/styled';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';


const Filter = styled(ToggleButton)`
color: ${props => props.selected ? "blue!important" : "white!important"};
border-color: white!important;
display: inline-flex;
`;



export default function FilterButtons({activeFilter, changeFilter}) {


  return (
    <ToggleButtonGroup
      value={activeFilter}
      exclusive
      onChange={changeFilter}
      aria-label="text alignment"
    >
      <Filter value="left" aria-label="left aligned">
        All
      </Filter>
      <Filter value="center" aria-label="centered">
        Done
      </Filter>
      <Filter value="right" aria-label="right aligned">
        Active
      </Filter>
      
    </ToggleButtonGroup>
  )
}
