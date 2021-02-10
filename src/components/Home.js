import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from '../contexts/AuthContext';

async function getArticles() {
  const response = await fetch('http://localhost:8080/articles/');
  const data = await response.json();
  return data;
};

function Home(props){
  const {currentUser} = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getArticles()
     .then(articles => {
       console.log(articles);
       setArticles(articles);
     })
  }, []);

  return (articles ? <ul>{articles.map((article, index) => { return <li key={index}>{article.title}</li>})}</ul> : <div className="Home">Home</div>) 
}

export default Home;