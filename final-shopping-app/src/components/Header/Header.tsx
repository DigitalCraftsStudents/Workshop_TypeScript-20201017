import React, { ReactElement } from 'react';
import './Header.css';
import person_icon from './person_icon.png';
import logo from './logo.png';

function Header(): ReactElement {
  return (
    <div className="Header">
      <div className="titleHolder col-9">
        <img className='logo' src={logo} alt="logo" width={45} height={45}/>
        <h3>Pawesome Pet Supply Co.</h3>
      </div>
      <div className="userInfo col-4">
        <img src={person_icon} alt="person icon" width={40} height={40}/>
        <div>
          Hello, Aaryn
        </div>
      </div>
    </div>
  );
}

export default Header;