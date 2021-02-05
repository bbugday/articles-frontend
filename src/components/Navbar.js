import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
//<a class="nav-link" href="/">Home</a>

function Navbar(props){

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const cookies = new Cookies();

  function logout() {
    cookies.remove('jwt');
    setCurrentUser();
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/" exact={true}>Brand</NavLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      {currentUser ? 
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/">{currentUser.username}</NavLink>
            </li>
            <li class="nav-item">
              <Button onClick={logout} variant="outline-danger">Log out</Button>
            </li>
          </ul>
        </div>
        :
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/login">Log in</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/signup">Signup</NavLink>
            </li>
          </ul>
        </div>
      }
    </nav>    
  )
}
export default Navbar;