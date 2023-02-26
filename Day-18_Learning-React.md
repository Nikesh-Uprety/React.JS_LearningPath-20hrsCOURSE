# React Thunk
It is an Side-Effect Library which is simpler but Redux-Sage is more popular but because of its simplicity we will be learning `React Thunk`.

It allows you to write asynchronous logic that interacts with your Redux store.
In simpler terms, it enables Redux to handle asynchronous code more easily. Normally, Redux only supports synchronous actions, which means that the state of the application can only be changed after an action has been dispatched and completed. But with Thunk, we can dispatch asynchronous actions, which are functions that return other functions, and use them to update the state.

## Adding Redux Thunk to React
- We can install Redux Thunk into our React project by running the command.
- `npm install redux-thunk redux-devtools-extension @babel/runtime`
- And one more thing that will helps us, 
- `npm install --save-dev @babel/plugin-transform-runtime`

Importing the required libraries in our `store.js` file for `redux-thunk`
-  Some of the imported libraries are show below, also we replaced the window. __ REDUX_DEVTTOLS_EXTENSION below with the imported one.
```javascript
import { createStore, combineReducers , applyMiddleware} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
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

export const configureStore = () =>
    createStore(
        persistedReducer,
       composeWithDevTools(
        applyMiddleware(thunk)
       )
    );
```
## Async Thunks,
- Into our new file `thunk.js` we created an thunk `loadTodos`. 
- Then we created three actions in out `action.js` file.
```javascript
export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const loadTodosSuccess = todos => ({
    type: LOAD_TODOS_SUCCESS,
    payload: { todos },
});

export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';
export const loadTodosFailure = () => ({
    type: LOAD_TODOS_FAILURE,
});
```
- Then we imported those actions into our thunk.js file.
- And then, we used `dispatch` to fetch the data from the url.
- Here is the example,
```javascript
import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';
export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}
export const displayAlert = text => () => {
    alert(text);
};
```
Adding a new reducer `isLoading` to out `reducer.js` file,
```javascript
import {
    CREATE_TODO,
    REMOVE_TODO,
    MARK_TODO_AS_COMPLETED,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
} from './actions';

export const isLoading = (state = false, action) => {
    const { type } = action;

    switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
        return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
        return false;
    default:
        return state;
    }
}
```
- After that we created an function in our `todolist.js` file to display the loading message when our todo's are beign loaded from the server.
```javascript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { loadTodos } from './thunks';
import { removeTodo, markTodoAsCompleted } from './actions';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
- We alos used useEffect hook to display that message once the DOM refreshes.

Defining cases for each of the three action, `LOAD_TODOS_IN_PROGRESS`, `LOAD_TODOS_SUCCESS`, `LOAD_TODOS_FAILURE` in our `reducer.js` file. 
```javascript
    case LOAD_TODOS_SUCCESS: {
        const { todos } = payload;
        return todos;
    }
    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:
    default:
        return state;
    }
```
- I adde the server resource from the exercise file that has been provided in the course, and the app now fetch the data from the server, as I am running the server.

### Now to make the todo that we added to be saved into our server we used ***thunks.***
- In this process we, added an thunk `addtodoRequest` into out `thunk.js` file and write the code that post the todos when added to the localhost:8080
```javascript
export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}
```

Also, on the `actions.js` file we replaces text into todo.
```javascript
export const createTodo = todo => ({
    type: CREATE_TODO,
    payload: { todo },
});
```

In the reducer file, instead of creating text as our todo, we replaced it with todos,
```javascript
    case CREATE_TODO: {
        const { todo } = payload;
        return state.concat(todo);
    }
```

Lastyle we are going to our `Newtodoform.js` and we are going to dispatch the thunk we just created.
```javascript
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});
```

### Deleting server resources using thunks!
- As we previously created an thunk to add the todo we now create a thunk to delete the todo,
- Here is an example,
```javascript
export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}
```
- Also same thing, replacing the text with todo in the `actions.js` `removetodo` function,
```javascript
export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = todo => ({
    type: REMOVE_TODO,
    payload: { todo },
});
```
- Then we opened the `reducer.js` file and instead of getting text as a playload we are going to get todo so we replaced the text with todo and set an nickname for it.
```javascript
    case REMOVE_TODO: {
        const { todo: todoToRemove } = payload;
        return state.filter(todo => todo.id !== todoToRemove.id);
    }
```
- Lastly instead of filter base on todo as befor ewe are goinf to filter based on id.

And now, we have to dispatch the thunk we have just created in the `todolist.js` file 
```javascript
onRemovePressed: id => dispatch(removeTodoRequest(id)),
```
- One last thing in the `TodoListitem.js` file, we have to replace todo.text with todo.id.
```javascript
onClick={() => onRemovePressed(todo.id)}
                className="remove-button">Remove</button>
```

### Marking todos as completed,
- We start by adding a new thunk `martodascompleted` as other thunk used before, 
```javascript
export const markTodoAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}
```
- I Changed the argument from text to todo and from playload as well in `actions.js` file.
```javascript
export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const markTodoAsCompleted = todo => ({
    type: MARK_TODO_AS_COMPLETED,
    payload: { todo },
});
```
- Also, on the `reducers.js` file we did the same thing as replacing the text with todo and giving it an nickname and campared the todo.is and returned the updated todo,
```javascript
    case MARK_TODO_AS_COMPLETED: {
        const { todo: updatedTodo } = payload;
        return state.map(todo => {
            if (todo.id === updatedTodo.id) {
                return updatedTodo;
            }
            return todo;
        });
    }
```
- And, in the `todolist.js` 
```javascript
   onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
```

Lastly on the todolist item, instead of calling todo with text I now called it with todo id.
```javascript
onClick={() => onCompletedPressed(todo.id)}
```
