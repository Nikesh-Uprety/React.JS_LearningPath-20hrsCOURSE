import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import articles from "./Article-content";
import Commentslist from "../components/commentslist";
import AddCommentForm from "../components/addcommentform";
import Notfoundpage from "./NotFoundPage";


const ArticlePage = () => {
  const [articleinfo, setArticleInfo] =useState({upvotes:0,comments:[]});
  const { articleId } = useParams();
  useEffect(()=>{
    const loadArticleinfo =async()=>{

      const response = await axios.get(`/api/articles/${articleId}`)
      const newarticleinfo = response.data;
      setArticleInfo(newarticleinfo);
    }
    loadArticleinfo();
  },[])

 
  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }


  const article = articles.find(article => article.name === articleId);
  if (!article){
    return <Notfoundpage />;
  }
  return (
  <>
  <h1>{article.title}</h1>
    <div className="upvotes-section">
      <button onClick={addUpvote}>Upvote</button>
  <p>This article has {articleinfo.upvotes} upvote(s)</p>
    </div>

  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle=> setArticleInfo(updatedArticle)}/>
  <Commentslist comments={articleinfo.comments}/>
  </>
    )
};
export default ArticlePage;
