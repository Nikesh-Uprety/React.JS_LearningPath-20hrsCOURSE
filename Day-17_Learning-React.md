# Connecting components to the store,
- I start where I left previously on Day 16, 
- The thing I am going to do is actually give the components in our application access to the Redux store, so that they can see what the current state is, as well as trigger actions that modify the state.
- They we I do is by connecting the components to the Redux Store,
- I start with the component `newtodoform` and import `{connect} from react-redux`.
```javascript
import React, { useState } from 'react';
import { connect } from 'react-redux';
```
- Then we define two functions and exported it using `connect` property.
```javascript
const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(createTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
```
- Also I passed the props in the main todo function
```javascript
const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');
```
- Lastly the functionality on the button is added using onClick event.
```javascript
<button
                onClick={() => {
                    const isDuplicateText =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className="new-todo-button">
                Create Todo
</button>
```
- This todoform is fully taking Advantage of redux rigth now.
## Working with redux in todolist component
- The flow for this is very similar to what I did in the `newtodoform`, I start by importing `connect` into my file.
- Then I define the two function `mapStateToProps` and `mapDispatchToProps` and return the respective elements for each function, then exporting these functions using `connect.`.
```javascript
  
const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
- Then passing the `onRemovePressed` inside where we map the todo as a props.
```javascript
const TodoList = ({ todos = [], onRemovePressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} />)}
    </div>
);
```
- Then we opened the `todolistitems.js` file and added the `onRemovePressed` as a props and addded onClick method on the button.
```javascript
const TodoListItem = ({ todo, onRemovePressed }) => (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
            <button className="completed-button">Mark As Completed</button>
            <button
                onClick={() => onRemovePressed(todo.text)}
                className="remove-button">Remove</button>
        </div>
    </div>
);
```
## Adding redux presist to our project,
- For the purpose of keeping our rdeux states and the todolist unchanged and removed this, redux presist can maintain these state although site reload,

In the `store.js` file redux presist is used to create a data store that helps us keep track of information. We can use this store to save information that we need for our app.

To create this store, we first import some libraries that help us manage the store. These libraries are called "redux", "redux-persist", and "redux-persist/lib/storage"
```javascript
import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { todos } from './todos/reducers';

const reducers = {
    todos,
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer);
```
Next, we create a "`reducers`" object that holds all the different reducers we want to use in our store. In this case, there is only one reducer called "todos".

Then, we set up a configuration object that tells our store how to save and load data. This configuration object is called "persistConfig". It has a unique name called "key", which helps our app recognize this store. It also has a "storage" property that tells our store where to save the data. The "stateReconciler" property helps us make sure the data is saved correctly.

After that, we use a function called "`combineReducers`" to combine all of our reducers into one big reducer. This reducer is called "rootReducer".

We also use another function called "`persistReducer`" to create a new reducer that uses our configuration object. This new reducer is called "persistedReducer".

Finally, we use a function called "`configureStore`" to create our store. This store uses our "`persistedReducer`" and it is ready to be used in our app.

### Then we open up the `index.js` and import the same imported `persistStore`

1. To use the store in our React app, we first import some libraries that help us manage the store. These libraries are called "redux-persist", "redux-persist/lib/integration/react", and "react-redux".
2. Next, we create our store and persistor by calling the "configureStore" function and "persistStore" function respectively.
3. We also use a "`PersistGate`" component to help us persist our data. This component takes two props: "loading" and "persistor". The "loading" prop is used to show a message while our app is loading, and the "persistor" prop tells the component which persistor to use.
4. Finally, we render our main app component, which is called "`App`", inside the "`PersistGate`" component. We also tell the "`ReactDOM.render`" function to render our app in the "`root`" element in the HTML document.
- Here is the example of the code ,
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './App.js';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={<div>Loading...</div>}
            persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
```
## Redux DevTools
- This helps to look directly at the state of our application instead of blindly develop and relay on the state of ou r components to show what's actually in our Redux store.
- We installed the `redux devtool` extension from chrome web store
- And, we also made some changes to our `store.js` file to work the extension properly.
- The is a very helpful extension while working with redux, it gives different sorts of features that can be helpful and one feature is dispatch.
### Redux best practices!
1. Export the connected and unconnected versions of a component.
2. Keep Redux actions and async operations out of your reducers.
3. Think carefully about cnnecting components.
## Marking the todos as completed,
- Firstly on the `action` page, we created an new action, `MARK_TODO_AS_COMPLETED`
```javascript
export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const markTodoAsCompleted = text => ({
    type: MARK_TODO_AS_COMPLETED,
    payload: { text },
```
- Then on the reducer we added an new case, `MARK_TODO_AS_COMPLETED` after importing and inside the case I got the text property from the playload then, I map the todo and compare the text of todo as the playload then returning the todo.
```javascript
     case MARK_TODO_AS_COMPLETED: {
        const { text } = payload;
        return state.map(todo => {
            if (todo.text === text) {
                return { ...todo, isCompleted: true };
            }
            return todo;
        });
```
- After that , I opened the todolist and imported the action creater that we just made, and added a prop called `onCompletedTodo`.
- Then on the top I added that prop to the `todolist`,
```javascript
const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map(todo => <TodoListItem
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)}
    </div>
);

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});
```
- Lastly, we added the `onCompleted` props to the todolitem and added an `onCLick` event to the `Mark as completed` button.
```javascript
const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
            {todo.isCompleted
                ? null
                : <button
                    onClick={() => onCompletedPressed(todo.text)}
                    className="completed-button">Mark As Completed</button>}
            <button
                onClick={() => onRemovePressed(todo.text)}
                className="remove-button">Remove</button>
        </div>
    </div>
);

```
