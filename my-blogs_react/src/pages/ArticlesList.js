import { Link } from "react-router-dom";
import articles from "./Article-content"
import ArticleList from "../components/ArticleList"
const ArticlelistPage = ()=>{
    return( 
        <>
        <h1>Articles</h1>
        < ArticleList articles={articles} />
        </>
    )
}
export default ArticlelistPage 