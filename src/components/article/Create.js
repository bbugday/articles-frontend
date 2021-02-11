import React, {useRef, useState, useContext} from "react";
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {AuthContext} from '../../contexts/AuthContext';

export default function Create(props){
  const {currentUser} = useContext(AuthContext);
  const titleRef = useRef();
  const bodyRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
		const body = bodyRef.current.value;
    try {
			setError('');
      setLoading(true);
      const res = await fetch('http://localhost:8080/articles/create', {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
			setLoading(false);
      props.history.push('/');
    } catch (err) {
      setError('Failed to post.');
    }
  };


  return(
		<>
      {currentUser ? 
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Create New Article</h2>
            {error && <Alert variant="danger"> {error} </Alert> }
            <Form onSubmit={handleSubmit}>
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" ref={titleRef}></Form.Control>
              </Form.Group>
              <Form.Group id="body">
                <Form.Label>Body</Form.Label>
                <Form.Control type="textarea" ref={bodyRef}></Form.Control>
              </Form.Group>
              <Button disabled = {loading} className="w-100" type="submit">Post</Button>
            </Form>
          </Card.Body>
        </Card>
    :
    <p>Please log in.</p>
    }
    </>
	)
};