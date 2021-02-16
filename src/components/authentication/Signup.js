import React, {useState, useContext, useRef} from "react";
import Cookies from 'universal-cookie';
import {AuthContext} from '../../contexts/AuthContext';
import './Signup.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

export default function Signup(props){
  const cookies = new Cookies();
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');

  async function handleSubmit (e){
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		try {
			setError('');
      const res = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      const data = await res.json();
      cookies.set('jwt', data.authToken, {maxAge: 3 * 24 * 60 * 60});
      if (data.user) {
        setCurrentUser(data.user);
        props.history.push('/');
			}
    } catch (err) {
      setError('Failed to login.');
    }
  };
  
  return(
		<div>
      {currentUser ? 
      <div className="signed-in">You are already signed in.</div> 
      : 
      <div className="Signup">
        <div className="label">Sign up to articles</div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" ref={usernameRef} required/>
            <input name="password" type="password" placeholder="Password" ref={passwordRef} required/>
            <div className="submit-button" onClick={handleSubmit}><FontAwesomeIcon className="arrow-icon" icon={faArrowRight}/></div>
            <input type="submit" className="hidden-submit" value="Submit" />
          </form>
      </div>
      }
    </div>
	)
};
