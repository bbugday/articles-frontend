import React, {useEffect, useState} from "react";
import './ArticleDetails.scss';

async function getArticle(id) {
  const response = await fetch(`http://localhost:8080/articles/${id}`);
  const data = await response.json();
  return data;
};

export default function ArticleDetails(props){

  const [article, setArticle] = useState();

  useEffect(() => {
    getArticle(props.match.params.id).then(article => {
      setArticle(article);
    });
  }, []);

  return (
    <div>
      {article ? <div>{article.body} {article.body} {article.user.username} <img src={article.imageUrl}></img></div> : <div>can not find</div>}
    </div>
  )
};
