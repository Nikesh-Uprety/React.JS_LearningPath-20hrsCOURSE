# Creating an Firebase project,
- As adding user authentication from scratch is a lot of work and time consuming, we will use firebase user authentication to make our work easier ,
- Firebase authentication stores all the usernames and password in a very secure manner for us.
- So, we head towards `console.firebase.google.com` and created an project names `learn-reactjs`
- After I went to `authentication` inside the build menu, and added `emai` authentication and also created an dummy user for testing purposes.
# Adding login-signup to our front-end
- I have created two new page inside the `pages` folder, one page named `loginpage.js` for user login and page named `CreateUserAccount.js` for the user signup page, 
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
## Making overall upvote and comment more functionable,
- This is a very long process and I had to consider a number of things to make this right,
- I started by using something called `authtoken` , it helps to identify everytime the user has login and also, if onone has login,
- Some of the files that were edited during these process , their final codes are,
`articlepage.js`
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


```
`navbar.js`
```javascript
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import useUser from '../hooks/useUser';

const NavBar = () => {
    const { user } = useUser();
    const navigate = useNavigate();

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
            <div className="nav-right">
                {user
                    ? <button onClick={() => {
                        signOut(getAuth());
                    }}>Log Out</button>
                    : <button onClick={() => {
                        navigate('/login');
                    }}>Log In</button>}
            </div>
        </nav>
    );
}

export default NavBar;
```
`server.js`
```javascript
import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDB } from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

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

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

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

connectToDB(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})
```
`addcomments.js`
```javascript
import React from "react";
import { useState } from "react";
import axios from 'axios';
import useUser from '../hooks/useUser';

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


  return (
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
  )
}
export default AddCommentForm;

```
- Finally after making different sorts of changes, the development phase is completed and the app is running smoothly.