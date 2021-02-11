import React, {useState, useContext, useRef} from "react";
import Cookies from 'universal-cookie';
import {AuthContext} from '../../contexts/AuthContext';

function Signup(props){
  const cookies = new Cookies();
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);


  async function handleSubmit (e){
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		try {
			setError('');
      setLoading(true);
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
			setLoading(false);
    } catch (err) {
      setError('Failed to login.');
    }
  };

  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            ref={usernameRef}
            required/>
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            ref={passwordRef}
            required />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
}

export default Signup;