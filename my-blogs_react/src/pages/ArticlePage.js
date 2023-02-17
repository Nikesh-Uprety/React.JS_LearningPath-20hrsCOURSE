import React from "react";
import { useParams } from "react-router-dom";
import articles from "./Article-content";
import Notfoundpage from "./NotFoundPage";
const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find(article => article.name == articleId)
  if (!article){
    return <Notfoundpage />;
  }
  return (
  <>
  <h1>{article.title}</h1>
  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  </>
    )
};
export default ArticlePage;
