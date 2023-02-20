import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import articles from "./Article-content";
import Commentslist from "../components/commentslist";
import AddCommentForm from "../components/addcommentform";
import Notfoundpage from "./NotFoundPage";
import useUser from '../hooks/useUser';

const ArticlePage = () => {
  const [articleinfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
  const { canUpvote } = articleinfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.get(`/api/articles/${articleId}`, { headers });
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
    }

    if (isLoading) {
        loadArticleInfo();
    }
}, [isLoading , user]);


const article = articles.find(article => article.name === articleId);
  
const addUpvote = async () => {
  const token = user && await user.getIdToken();
  const headers = token ? { authtoken: token } : {};
  const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
  const updatedArticle = response.data;
  setArticleInfo(updatedArticle);
}


  if (!article){
    return <Notfoundpage />;
  }
  return (
  <>
  <h1>{article.title}</h1>
    <div className="upvotes-section">
    {user
        ?  <button onClick={addUpvote}>{'Upvote'}</button>
        :  <button >Login to Upvote</button>}
         
  <p>This article has {articleinfo.upvotes} upvote(s)</p>
    </div>

  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  {user 

  ? <AddCommentForm articleName={articleId} 
  onArticleUpdated={updatedArticle=> setArticleInfo(updatedArticle)}/>
        :  <button >Log in to add a comments</button>}
  
  <Commentslist comments={articleinfo.comments}/>
  </>
    )
};
export default ArticlePage;
