import React, {useRef, useState, useContext} from "react";
import {AuthContext} from '../../contexts/AuthContext';
import './Create.scss';

  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const img = await res.json();
    return img.secure_url;
  };

export default function Create(props){
  
  const {currentUser} = useContext(AuthContext);
  const titleRef = useRef();
  const bodyRef = useRef();
  const [uploadingImg, setUploadingImg] = useState(false);
	const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    img: ""
  });
  const [imgUrl, setImgUrl] = useState('');


  async function handleFileChange(event){
    console.log(process.env.REACT_APP_DENEME);
    const [file] = event.target.files;
    if (!file) return;
    setUploadingImg(true);
    const uploadedUrl = await uploadImage(file);
    setImgUrl(uploadedUrl);
    setUploadingImg(false);
  };

  async function handleSubmit(e){
    e.preventDefault();
    const title = titleRef.current.value;
		const body = bodyRef.current.value;
    const imageUrl = imgUrl;
    try {
			setError('');
      const res = await fetch('http://localhost:8080/articles/create', {
        method: 'POST',
        body: JSON.stringify({title, body, imageUrl}),
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
          <label className="image-label" for="image">Image</label>
          <input type="file" accept="image/*" id="image" onChange={handleFileChange} disabled={uploadingImg}/>
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