# React: Server-Side Rendering
Isomorphic, Universal, or Server-Side Rendering (SSR) they all means the same thing as the application is rendered in the server instead of the client.

![[Pasted image 20230228174852.png|400]]

## Benifits:
- Faster load times: When the application renders on the server, on matter what device you are using to view that website it will load faster not replying on their inherent device.
- Improved SEO.
- SSR alos helps us to scale our application without worrying about its performance, if the appication need more power, All we need to do is provide a hardware support.

## Setting up Next.js with react.
- I first setup the package.json file with `npm init -y` and install react react-dom and next using `npm install react react-dom next`.
- Then we made some change in our package.json file. as
`  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },`
- Then we setup the files required for our project, from the resource folder, some photos in the public folder and some js and css file in the `pages`
- Also data.json file which contains dummy data of the cards, was also made inside the API folder and imported into our `index.js` file and map it in our application.
## Adding Redux store and setup,
- It is useful for manage state across components.
- For installing we run the following commands,
- `npm i next-redux-wrapper react-redux redux`

Now that we have setup redux, lets make an `store.js`.
- In the store.js file we have created an simple state function `store` which takes initialStore.
- Here is the example,
```javascript
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import data from './pages/API/data.json';

// create store
const store = (initialState = startState) => {
    return createStore(reducer, initialState);
};

export const initStore = createWrapper(store);
```

- Then we created an initial state and Actions inside the `store.js` file,
- The action retuns type and certain data in my case I am returning cards.data and item, here is an example.
```javascript
const startState = {
    cards: []
};

// Actions
export const initialCards = () => {
    return {
        type: 'INITIALCARDS',
        cards: data
    }
};
export const addItem = (item) => {
    return {
        type: 'ADD',
        item
    }
};

```

- Now we have two functions that we need to pass into our application.
- We then imported these in our index.js function.
#### The way how actions works is they are called from the component thorugh the function called dispatch.
- Here is an example of the file index.js after begin modified,
```javascript
import React from 'react';
import styles from './index.module.css';
import Card from './Card';
import { initStore, initialCards, addItem } from '../store';

class index extends React.Component{
    static async getInitialProps({store}) {
        return store.dispatch(initialCards)
    }

render () {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <img src="/logo.png"
                    className={styles.logo} alt="logo"
                />
            </header>
            <div className={styles.grid}>
                {
                this.props.cards.map((card)=>(
                    <Card key={card.id}/>
                ))             
                }
            </div>
        </div>
    )
}
};
export default initStore.withRedux(index)
```

Next step to complete redux is to add the reducers, basically the function that takes the action dispatch by the application and the update the store with new information and therefore the application will be able to update its view with the updated data.

Lets go ahead and build that.
- We are again in the `store.js` file and creating the reducers.
- Here is the example,
```javascript
// reducers
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALCARDS':
            return {
                cards: action.cards,
            }
        case 'ADD':
            return {
                ...state,
                cards: [...state.cards, action.item],
            }
        default: return state
    }
}

```

## Why use Redux in SSR
- Centralized state management.
- Battel tested with React.

## Installing express and making server,
- To install express we runned the command `npm install express`
- Then we created `server.js` file and made an server which runs on port 3000.
- Here is the example,
```javascript
const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${port}`);
    })
})
```

## Adding the Express Routes,
- Adding some routes into our `server.js` file.
- First is get.route on /page2 second on /page3 and another is default route( * ).
```javascript

        server.get('/page2', (req, res) => {
            return app.render(req, res, '/page2');
        })

        server.get('/page3', (req, res) => {
            return app.render(req, res, '/ohyeah');
        })

        server.get('*', (req, res) => {
            return handle(req, res);
        })
```

## Creating the pages that we have added routes.
- First we imported Links, and then made two file page2 and ohyeah, 
- Inside these files, we added an simple H1 telling its pages.
```javascript
<header className={styles.header}>
                    <Link href="/page3">
                    
                    <img src="/logo.png"
                        className={styles.logo} alt="logo"
                    />
                    </Link>
                </header>
```
- ohyeah file
```javascript
const ohyeah =()=>{
    return(

        <h1>I'm page 3 trapped inside of OH Yeah!</h1>
    )
}
export default ohyeah
```

## Why use Express with Next.js
- Routes, HTTP and other benefits.
- Express, Next.js, React = Great tool set.

## Code splitting in Next.js
![[Pasted image 20230228204654.png|450]]
Code splitting in a nutshell is the ability to split your codes in smaller bundles so the application can load faster when render. 

Next js comes with codesplitting out of the box, .
There are also other feature such as,
- Dynamic imports
- Dynamic React components
Which helps to allow you to delay or load specific features on demand and maintain full control of your application load time. 
Nextjs does code splitting automatically for us.

#### The purpose of code splitting
- Need performance improvement.
- Splits your rendered code into components.
