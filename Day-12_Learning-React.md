# Creating an Firebase project,
- As adding user authentication from scratch is a lot of work and time consuming, we will use firebase user authentication to make our work easier ,
- Firebase authentication stores all the usernames and password in a very secure manner for us.
- So, we head towards `console.firebase.google.com` and created an project names `learn-reactjs`
- After I went to `authentication` inside the build menu, and added `emai` authentication and also created an dummy user for testing purposes.
# Adding login-signup to our front-end
- I have create two new page inside the `pages` folder, one page named `loginpage.js` for user login and page named `CreateUserAccount.js` for the user signup page, 
- Then I have improted the paged into my main `app.js` file and setting up the Router for each page.
```javascript
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
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
        <Route path="/login" element= {<LoginPage />}/> // Login page
        <Route path="/signup" element= {<CreateAccountPage />}/> // Signup page
        <Route path="*" element = {<Notfoundpage/>} />
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
```
## Working in our Login Page.
- Then we work in our login page, 
- First I haved add three state variable for `emai`, `password` and `error`.
- Then I did the basic  onChange on the input types email and password,
- Then the error message is set for the className=`error`.
- Then for the actual login function, I imported the `getAuth and signInWithEmailAndPassword` form the `firebase/auth`;
- I created on login function which contains firebase login and set onClick event to the button calling that function.
- The final code is;
```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <button onClick={logIn}>Log In</button>
        <Link to="/create-account">Don't have an account? Create one here</Link>
        </>
    );
}
export default LoginPage;
```
## Creating an custome hook
- This hook is useful for what I call session management,
- This hook helps to manage the login page and identifies if the user has logged in or not, and if the user is not logged in in out articles page it displays login to upvote and it the user has logged in it displays the upvote button and add comment field.
- The code for this hook is;
```javascript
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, isLoading };
}

export default useUser;
```

## Using the previously created custome hook,
- I imported the hook in the `article.js` page and used it to create an state variable, 
- Then I added simple if not conditional statement to the upvote and comment section in the article and that's it.
```javascript
const { user, isLoading } = useUser();
```


```javascript
<h1>{article.title}</h1>
    <div className="upvotes-section">
    {user
        ?  <button onClick={addUpvote}>Upvote</button>
        :  <button >Login to Upvote</button>}
         
  <p>This article has {articleinfo.upvotes} upvote(s)</p>
    </div>

  {article.content.map((paragraph,i) => (
    <p key={i}>{paragraph}</p>
  ))}
  {user 

  ? <AddCommentForm articleName={articleId} 
  onArticleUpdated={updatedArticle=> setArticleInfo(updatedArticle)}/>
        :  <button >Login to add a comments</button>}
  
  <Commentslist comments={articleinfo.comments}/>
  </>
    )
```
## Working in out CreateAccount Page
- Same as login page, I created this page, to create new user which added the users email and password in the firebase authentication.
-  The component uses `useState` to define four pieces of state: `email`, `password`, `confirmPassword`, and `error`.
-  The component includes a form with three input fields, and a "Create Account" button that calls a `createAccount` function to create a new account using Firebase Authentication.
-  If the user enters mismatched passwords, an error message is displayed, and the account is not created.
-  If the account is created successfully, the user is navigated to the "/articles" page, and if there is an error during the account creation process, an error message is displayed.
- The final code for this is,
```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password and confirm password do not match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log in here</Link>
        </>
    );
}
export default CreateAccountPage;
```
## Adding firebase auth to our Node.js
- In this part I basically imported the firebase admin in my `server.js` file to handle the users access when log in and out and also, to limit the user to add only one upvote and so on,
- The final code is 
```javascript
import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDb } from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
   
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})
```

# Protecting endpoints using auth-tokens
- Remember it is important to protect our endpoint so that the, users cann't give muptiple upvotes to single article and cann't add an comment if not logged in.
- In  both of the above cases what we are going to do is, protect our end point by basically checking if the users that made an request was logged in or not.
- Now, I am introducting authtoken in my code, and everytime an user made an request , along with the request the authoken is added there. This helps the front-end to proves the user is logged in and , that they who they say they are.
- We start by getting the authtoken from the firebaseadmin `model`
```javascript
  


app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});

```

## Upvotes config, 
- This is important to display that if the user has already upvoted the article or hasnot upvoted already so that He/she can upvote the article., 
- So to do so, I have somw changes in my articles endpoint,
- Here is the code,
```javascript
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user; // The authotoken is bringed form the previous funtion.

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});
```
- And also, I need to protect the endpoint, and uses shouldnot have acces to upvote and comments if they are not logged in, to do so, 
- Here is an example,
```javascript
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

```
- Now, I make the upvotes function actually work and setting all criteries, such as the user can only upvotes once,
- To do so I made an `push` request which send in the uid, when upvoting, so that next if the upvote request is comming form the uid that previously upvotes it doesnot made the request.
- Here is the the code example,
```javascript
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
   
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid },
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.send('That article doesn\'t exist');
    }
});

```
## Comments config
- I want to show the email of the user in the comments section instead of the, name that the user has the option to take, 
- To do so, I removed the `postedBy` property and add `email property` from `req.user`.
- The example is ,
```javascript
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});
```

## Setting authtoken every time the user request
- This is how the client proves that the user is logged in to the server.
- To do so, In out `article.js` page every where that I made can request with axios we are going to have to include the header with user authtoken.
- Here is the example,
```javascript
    useEffect(() => {
    const loadArticleInfo = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.get(`/api/articles/${articleId}`, { headers });
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
    }
```
- 
- All we need to do is adding thes avove aruguments to others request,
- For `upvotes`
```javascript
const addUpvote = async () => {
  const token = user && await user.getIdToken();
  const headers = token ? { authtoken: token } : {};
  const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
  const updatedArticle = response.data;
  setArticleInfo(updatedArticle);
}

```
- For `comments` I added those same arguments on the `addcomments.js` file,
```javascript
const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        },{
          headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

```
## Making changes on the addCommentsForm
- I change the input type name and instead of user having to enter therir name before commenting, the name part converts into email and the user email is taken to add comment automatically, so that it cannot be faked.
- Here is the code example,
```javascript
    eturn (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <label>
        
        <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50" />
            </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
```
## Making the upvote button Dyanamic
- What it does it that, if the user has already upvoted, it displays already upvoted and if the user hasn't it display upvote button,
- I created an `canUpvote` element which is set to false in default,
- And one last thinng, I want to make that this only happens if the user is logged in,
- So here is the code example,
```javascript
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

    if (!isLoading) {
        loadArticleInfo();
    } // This checks if the user is logged in or not,
}, [isLoading , user]);


const article = articles.find(article => article.name === articleId);
  
const addUpvote = async () => {
  const token = user && await user.getIdToken();
  const headers = token ? { authtoken: token } : {};
  const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers }); // adding authoken headers
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
        ?  <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button> /// This is the part that makes the upvote dynamic 
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

```
## Updating navbar
- The navbar must include and logout or login button depending on the state of the users is logged in or out, 
- So the code example is 
```javascript
  <div className="nav-right">
                {user
                    ? <button onClick={() => {
                        signOut(getAuth());
                    }}>Log Out</button>
                    : <button onClick={() => {
                        navigate('/login');
                    }}>Log In</button>}
            </div>
```
- Finally after making different sorts of changes, the development phase is completed and the app is running smoothly.
