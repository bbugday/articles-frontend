import React, {useRef, useState, useContext} from "react";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {AuthContext} from '../contexts/AuthContext';

export default function Login(props){
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
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      const data = await res.json();
      cookies.set('jwt', data.authToken, {maxAge: 3 * 24 * 60 * 60});
      if (data.user) {
        setCurrentUser(data.user);
        //window.location.assign('http://localhost:3000/');
        props.history.push('/');
			}
			setLoading(false);
    } catch (err) {
      setError('Failed to login.');
    }
  }

  return(

		<>
    {currentUser ? 
    <p>
      You are already logged in.
    </p>
    :
    <Card>
      <Card.Body>
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert variant="danger"> {error} </Alert> }
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" ref={usernameRef}></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef}></Form.Control>
          </Form.Group>
        <Button disabled = {loading} className="w-100" type="submit">Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
    }
    </>
	)
}
