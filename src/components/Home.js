import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from '../contexts/AuthContext';
import './Home.scss';

async function getArticles() {
  const response = await fetch('http://localhost:8080/articles/');
  const data = await response.json();
  return data;
};

function Home(props){
  const {currentUser} = useContext(AuthContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(articles => {
      setArticles(articles);
    });
  }, []);

  return (articles ? 
    <div className="Home">
      {articles.map((article, index) => {
        return (
          <div className="article">
            <img className="image"  width="550" height="300" src={article.imageUrl}></img>
            <div className="title">{article.title}</div>
            <div className="body">{article.body?.slice(0,590)} <span onClick={() => {props.history.push(`/article/${article._id}`);}}>Read More...</span></div>
            <div className="author"><span>Author: </span>{article.user?.username}</div>
          </div>
        )
      })}
    </div> 
    : 
    <div>Loading</div>) 
  }

export default Home;