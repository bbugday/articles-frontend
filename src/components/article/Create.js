import React, {useRef, useState, useContext} from "react";
import {AuthContext} from '../../contexts/AuthContext';
import './Create.scss';

export default function Create(props){
  const {currentUser} = useContext(AuthContext);
  const titleRef = useRef();
  const bodyRef = useRef();
	const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
		const body = bodyRef.current.value;
    console.log(title,body);
    try {
			setError('');
      const res = await fetch('http://localhost:8080/articles/create', {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      props.history.push('/');
    } catch (err) {
      setError('Failed to post.');
    }
  };

  return(
		<div>
      {currentUser ? 
      <div className="Create">
        <div className="label">Create new article</div>
        <form className="create-form" onSubmit={handleSubmit}>
          <label for="title">Title</label>
          <input name="title" className="title-input" id="title" type="text" ref={titleRef} required/>
          <label className="body-label" for="body">Body</label>
          <textarea rows={20} id="body" ref={bodyRef}></textarea>
          <input type="submit" className="hidden-submit" value="Submit" />
        </form>
      </div>
      : 
      <div class="no-user">
        <span onClick={() => {props.history.push('/login')}}>Log in</span> to create new article.
      </div>
      }
    </div>
	)
};