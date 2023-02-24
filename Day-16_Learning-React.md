# The React Ecosystem
## Separation of concern is used in organiging the react and many concerns has been there and React Ecosystem tools are helping in doing so. 
## React Ecosystem tools,
> These tools helps to effectively separate our concerns, we will implement these tools into out projects later on.
## Building a react project from scratch
- Firsty I run the command `npm init -y` to initialize a new npm package, 
- Then, index.html file, inside the public folder is created, which containes the same elements as standar react app.
- An src folder is also created, then an babel file `.babelrc` is created to handle the jsx.
- Inside the src folder I created three file `app.css`, `app.js` and `index.js` and wirte the basic hello world.
- Lastly I setup `webpack.config.js` to setup and run our project in development mode.
## Creating react todolist for overall understanding
- Till now, the basic structure of todolist is made and different componets is created.
- The thing that were used to make the project is basic and I have a good understanding of these that is why I am not explaining each and every component and line of codes.
- The important thing that I am trying to do is building the project with Redux, which is an react ecosystem tool.
## Redux
Problems that redux solves
1. Props Drilling,
2. State Sharing,
3. GLobal state chaos.
#### The other Pieces of Redux
1. REDUX STORE
2. REDUX ACTIONS
3. REDUCERS
### Important Point,
- Components can only interact with the satet by triggering Redux actions.
### Installing REDUX into our project
- `npm install redux react-redux`
- Then I created an new file named `store.js` , in the src folder. This is where we put our logic setting up the redux store.
- Then we imported some module that we put,
```javascript
import { createStore, combineReducers } from 'redux';
const reducers = {};
const rootReducer = combineReducers(reducers);
export const configureStore = () => createStore(rootReducer);
```
- Next thing is to open the `index.js` file , import our `provider` from `react-redux `and wrap our `app` compoents in the `PROVIDER` and in that provider component we are gonna pass some elements.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './App.js';

ReactDOM.render(
    <Provider store={configureStore()} >
        <App />
    </Provider>,
    document.getElementById('root'),
);
```
### Creating Redux actions,
- The first action I created is `CREATE_TODO` which takes a text and adds further in the todolist,
```javascript
export const CREATE_TODO = "CREATE_TODO";

export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text },
});

```
- And the second action is `REMOVE_TODO` which removes the todo as a text from the previously add todo,
```javascript
export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = (text) => ({
    type: REMOVE_TODO,
    payload: { text },
  });
  
```
### Creating Reducers
- In the core a reducer is just a function name after whatever resource in the Redux store is in charge of Managing.
- This code is a reducer function that handles state updates for a "todos" list. It takes in two parameters:

-   `state`: the current state of the todos list, which is initialized as an empty array `[]`.
-   `action`: an object that contains a `type` property (a string representing the type of action being performed) and a `payload` property (an object containing any data needed to update the state).
```javascript
import { CREATE_TODO, REMOVE_TODO } from './actions';

export const todos = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_TODO: {
        const { text } = payload;
        const newTodo = {
            text,
            isCompleted: false,
        };
        return state.concat(newTodo);
    }
    case REMOVE_TODO: {
        const { text } = payload;
        return state.filter(todo => todo.text !== text);
    }
    default:
        return state;
    }
}
```
The code does two things: 1) it helps us add new items to our list and 2) it helps us remove items we don't need anymore. When we add something new, the code makes sure it has a name and that it hasn't been finished yet. When we remove something, the code looks for the item's name and takes it off the list. If the code doesn't understand what we're asking it to do, it leaves the list the way it is.