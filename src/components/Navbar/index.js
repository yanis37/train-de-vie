
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarDesign';

import logo from '../../images/logo_blanc.png'; 


const Navbar = () => {

  
  return (
    <>
      <Nav>
        <Bars />

        <img src={logo} style={{
        height: '200%',
        marginTop: '-35px',
        marginLeft: '-250px'
      }} />
        

        <NavMenu>

        

          <NavLink to='/home'>
            ACCUEIL
          </NavLink>
          <NavLink to='/carte'>
            CARTE
          </NavLink>
          <NavLink to='/infos'>
            INFORMATIONS
          </NavLink>
          
        </NavMenu>
        
      </Nav>
    </>
  );
};

export default Navbar;