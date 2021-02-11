import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Cookies from 'universal-cookie';
import './Navbar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faHome, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from "react-router-dom";

export default function Navbar(props){

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const cookies = new Cookies();
  const history = useHistory();

  function logout() {
    cookies.remove('jwt');
    setCurrentUser();
  };

  return (
    <nav className="Navbar">
      <div className="brand">BLOG</div>
      <div className="center">
        <FontAwesomeIcon onClick={()=>{history.push('/')}} className="home-icon navbar-icons" icon={faHome}/>
        <div className="add-icon" onClick={()=>{history.push('/create')}}><FontAwesomeIcon className="plus" icon={faPlus}/></div>
        <FontAwesomeIcon className="members-icon navbar-icons" icon={faUserFriends}/>
      </div>
      {currentUser ? 
      <div className="authentication"> 
        <div className="username">{currentUser.username}</div>
        <div className="logout" onClick={logout}>Log Out</div>
      </div>
      : 
      <div className="authentication">
        <div className="login-button" onClick={()=>{history.push('/login')}}>Login</div>
        <div className="signup-button" onClick={()=>{history.push('/signup')}}>Signup</div>
      </div>
      }
    </nav>    
  )
};