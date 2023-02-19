# Installing Axios Library
- Make sure to install in the front-end directory
- It provides url request to our frontend apps just like the we did in the postman, 
- The command to instal it is 
`npm install axios`
> We are going to add the upvotes and comment features in our app, so in order to do so, we need to get the server get, put and post request, But for testing purpose we are creating an state using useState hook which basically replicate the things that we are going to do, 
- Here is the code ,
```javascript
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./Article-content";
import Notfoundpage from "./NotFoundPage";
const ArticlePage = () => {
  const [articleinfo, setarticleinfo] =useState({upvotes:0,comments:[]});
  useEffect(()=>{
    setarticleinfo({ upvotes: 3, comments:[]});
  })
  const { articleId } = useParams();
  const article = articles.find(article => article.name == articleId)
  if (!article){
    return <Notfoundpage />;
  }
  return (
  <>
  <h1>{article.title}</h1>
  <p>This article has {articleinfo.upvotes} upvotes!</p>
  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  </>
    )
};
export default ArticlePage;
```
- Another important thing, we used useEffect which is an hook that provides logic to our state, So, in this case we have used it to generate an random number to show up to upvotes,
```javascript
useEffect(()=>{
    setarticleinfo({ upvotes: Math.ceil(Math.random()*10), comments:[]});
  },[])
```
- One thing that is very important while using useEffect it that it should be provided with empty arrat in the end, which means that the value are changed in the `useEffect` when the page load the components in the DOM and if the empty array is not provided it constantly changes the value and we dont want that, 
## Fetching the data from the database using axios
- First we import axios into our project,
- Then we created an get request which gets the datarequest inside of useEffect, 
- Then we display the upvotes elements by an get request to the URL, using axios, 
- The example is given below;
```javascript
useEffect(()=>{
    const loadArticleinfo =async()=>{

      const response = await axios.get(`/api/articles/${articleId}`)
      const newarticleinfo = response.data;
      setArticleInfo(newarticleinfo);
    }
    loadArticleinfo();
  },[])
```

## Displaying Comments,
- So to display the comments, I created an simple components, in which I map the comment, 
- Some property like, who has posted the comment and key are also added for convinient,
- The example is given below;
```javascript
const Commentslist=({comments})=>(
    <> 
    <h3>Comments:</h3>
    {
        comments.map(comment =>(
            <div className="comment" key={comment.postedBy + ':' +comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))
    }
    </>
);
export default Commentslist
```
## Creating an upvote button and updating them,
- Firstly we go the the `Articlepage.js` and creating an upvote function which tells the database that the the article is upvotes and displays the updated upvotes,
- The example is given below;
```javascript
    const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }

```
- And when the button is clicked the upvoted is added,
- Below is the example,
```javascript
<div className="upvotes-section">
      <button onClick={addUpvote}>Upvote</button>
  <p>This article has {articleinfo.upvotes} upvote(s)</p>
    </div>
```
- In our `server.js` file instead of display the text that the article has the number of upvotes we want to send back the article itself, and we want in json , so below is the code example,
```javascript
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
   
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article); // This is important part we changed
    } else {
        res.send('That article doesn\'t exist');
    }
});
```
## Creating an add comment form,
- I created an seperate component for this form,
- Here is the example,
```javascript
import { useState } from "react";
import axios from 'axios';
const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }


  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      <label>
        Name:
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text" />
      </label>
      <label>
        Comment:
        <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50" />
            </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  )
}
export default AddCommentForm;

```
- There are couple of important thing,  we created a two state which keep track of the current value of our name input and comment input,
```javascript
const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

```
- Also I passed a couple of props form the main `article.js` page,
```javascript
<AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle=> setArticleInfo(updatedArticle)}/>
```

```javascript
const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }
```
- Now we created an post request through axios which send the comment which we entered to the database and then display in the comment section,
```javascript
const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

```
- And in the input form, I set the value takes the name and commenttext and set the target,
- Lastly, in the button I added onclick property which takes the `addcomment` function when clicked and add the comment on that particular, article.