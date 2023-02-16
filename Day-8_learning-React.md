# Key Learning that I will be cover. 
- [ ] Create and develop a full stack react blog website
- [ ] User Authentication with Firebase offf
- [ ] React for interactive font-end for the blog site.
- [ ] Moving to Nodejs server with express tied in with MongoDB.
- [ ] Hosting the entire site on gcloud .

# Creating the front-end of my blog app
- First we created an folder called pages inside the src folder.
- Then we create different pages for our website.
- We install react-router-dom.
- We gave route to each components with pages in our app. [[Day-5_Learning-React#Configuring the router,|React Router]]
```javascript
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/NavBar';
import Homepage from './pages/Home';
import Aboutpage from './pages/About';
import ArticlePage from './pages/ArticlePage';
import ArticlelistPage from './pages/ArticlesList';
function App() {
  return (
    <BrowserRouter>   
    <div className="App">
      <Navbar/>    
    <div id="page-body">
      <Routes>
        <Route path="/" element= {<Homepage />}/>
        <Route path="/about" element= {<Aboutpage />} />
        <Route path="/articles" element= {<ArticlelistPage />} />
        <Route path="/articles/:articleId" element= {<ArticlePage />}/>
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
```
-  We created navbar component and gave it `Link` to navigate between pages and also we gave some styling.
```javascript
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
```
# Displaying blog-contents using URl parameters
- Firstly, we created an new file `article-content.js`, which containes, blogs `titles`, and `contents`.
- Then we work on articlepage, and imported `useParams` hook which  allows you to access the parameters of the current route.
- The const article checks that, the article name matches the articleId or not.
- Lastly, the articles component is imported from article-content page and mapped to display its title and paragarph, 
```javascript
import { useParams } from "react-router-dom";
import articles from "./Article-content";
const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find(article => article.name == articleId)
  return (
  <>
  <h1>{article.title}</h1>
  {article.content.map(paragraph => (
    <p>{paragraph}</p>
  ))}
  </>
    )
};
export default ArticlePage;
```
## Displaying list of articles on the articles page,
- We worked on `articlelist.js` file and first mapped the content of the article-contents.
- Then we added a substring which limits the paragraph content to 150 word so that it doesnot look very long and fits our list.
- Then in order to click on the individual article and rout to that particular page we add Link module and wrapped it to out title and paragaph,  
- Also, key is added to the link with `article.name` which gives an each article uniquness and fix the error that we see on the console.
- So, here is an example,
```javascript
import { Link } from "react-router-dom";
import React from "react";
const ArticleList = ({articles}) => {
  return (
    <>
      {articles.map(article =>(
               <Link key={article.name} className="article-list-item"to={`/articles/${article.name}`}>
               <h3>{article.title}</h3>
                <p>{article.content[0].substring(0,150)}...</p>
               </Link>  
        ))}
    </>
  );
};
export default ArticleList
```
- Also on the articlepage, to deal with the console error of unique key and proved key to out paragraph, we added indexing with provided new key to each of the paragaph in the increasing order, this is used only on the static ma this kinds of situation and cause problem while used in `todos` app.
- Here is an example,
```javascript
<h1>{article.title}</h1>
  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  </>
```
# Making our article list modular
- Basically what I did was instead of using the article list on the main page, I have created an `articlelist.js` seperate `components` which adds flexiblity to the article list and I can use it in, for eg, feature list, down in the page of an individual article, or on the home page.
```javascript
import { Link } from "react-router-dom";
import articles from "./Article-content"
import ArticleList from "../components/ArticleList"
const ArticlelistPage = ()=>{
    return( 
        <>
        <h1>Articles</h1>
        < ArticleList articles={articles} /> // This is the components
        </>
    )
}
export default ArticlelistPage 
```
# Lastly on the front-end part, an 404 Error page is created.
- This page is for the wronge routing path, except the path we have made in our app,
- Wheneever there is an invalid path to our url, it throws our `notfoundpage.js` which contains 404 error message.
- To do so, we have added a new Route, whose work isto throws the page an `notforundpage.js` messgae whenever is a router except we have created.
```javascript
<Route path="*" element = {<Notfoundpage/>} /> // * is used ot declear that logic.
```
- Also on the articlepage, the same logic is applied with different expression,
```javascript
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
```
# The link to the front end part of the project is:

