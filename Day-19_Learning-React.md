# Learning about Selectors.
Selectors in React are functions that extract specific pieces of data from the Redux store. They are used to provide the components with the relevant parts of the state that they need to render, and to prevent unnecessary re-renders of components when unrelated parts of the state change.
- In mapStateToProps function: When you connect a component to the Redux store using the `connect` function, you can pass a `mapStateToProps` function that returns an object containing the data the component needs from the store. This function can use selectors to extract the relevant data from the store.
## Creating Selectors.
We have created an new file `selectors.js` which contains the selectors we need,

- Also, we created two selctors `getTodos` & `getTodosLoading` , exported these selector and imported into our `list.js` file.
```javascript
export const getTodos = state => state.todos;

export const getTodosLoading = state => state.isLoading;
```
- Then after importing the selectors into our file we then replace the `state.todos` and `state.isLoading` with the selectors.
```javascript
const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todos: getTodos(state),
});

```
- Then we also, imported the selectors to `newtodoform` and replaced the  `state.todos`  with the imported selectors.
```javascript
const mapStateToProps = state => ({

    todos: getTodos(state),

});
```

Then in the `reducer.js` file,  we have created an const `initialState` with `isLoading: false and data: [ ]` (Empty Array),

So, now we are going to each of the case of the switch block here and replace it with appropriate logic!. 
So, here is the complete file example,
```javascript
import {
    CREATE_TODO,
    REMOVE_TODO,
    MARK_TODO_AS_COMPLETED,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
} from './actions';

const initialState = { isLoading: false, data: [] };

export const todos = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_TODO: {
        const { todo } = payload;
        return {
            ...state,
            data: state.data.concat(todo), // made changes here
        };
    }
    case REMOVE_TODO: {
        const { todo: todoToRemove } = payload;
        return {
            ...state,
            data: state.data.filter(todo => todo.id !== todoToRemove.id),
        };
    }
    case MARK_TODO_AS_COMPLETED: {
        const { todo: updatedTodo } = payload;
        return {
            ...state,
            data: state.data.map(todo => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            }),
        };
    }
    case LOAD_TODOS_SUCCESS: {
        const { todos } = payload;
        return {
            ...state,
            isLoading: false,
            data: todos,
        };
    }
    case LOAD_TODOS_IN_PROGRESS:
        return {
            ...state,
            isLoading: true,
        }
    case LOAD_TODOS_FAILURE:
        return {
            ...state,
            isLoading: false,
        }
    default:
        return state;
    }
}
```

Also, then we made a slight change in out `selectos.js` file,
- We have added todos in the `state.todo` and `state.isLoading` .
```javascript
export const getTodos = state => state.todos.data;

export const getTodosLoading = state => state.todos.isLoading;
```

## Combining selectors with Reselect,  to make two todolist in our app todolist, and marktodo as completed list.

Now, we are again in our `selection.js` file and imported `createSelector` from the reselect library. 
- We have created an new selector `getIncompleteTodos` using createSelector.
- We can also , add multiple selector as we want in out project without any issue, but now we are fine with this one selector!.
```javascript
import { createSelector } from 'reselect';

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted),
);
```
- We created another selector `getCompleteTodos` to get the completed todo in out selector.
```javascript
export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);
```

### Then for creating the sperate list to display these todos.
- We opened up the `todolist.js` and imported both of the selectors, 
```javascript
import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
} from './selectors';
```
- Then in the `mapStateToProps`, we have `splited` the todos, as `completedtodos` and `incompletedtodos`, 
- And, adding these props to the main todolist,
```javascript
const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {

        startLoadingTodos();

    }, []);
```
- Then instead of having one map to the todos, we are going to have two maps of the todos, as `completedtods` and `incompletedtodos`.
```javascript
<div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
            <h3>Marked as Completed:</h3>
            {completedTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
```

# Styled-Components,
 Styled components are whats refered to as CSS and javascript and what they allow us to do is define styling of our components inside of our Javascript files.

## Creating a styled-components
- We installed the styled-componets by running.
- `npm install style-components`
- Here is an sweet example,
- We imported `styled` from styled-components.
- Then we created an style using it,
```javascript
const Redtext = styled.div` // .div can be any HTML elements, such as buttons, li, a, etc
font-size:49px;
color: #FF0000
`;
```
- And then, we used that style in out project, by calling its name with attribute,
```javascript
    <Redtext> I am a style components </Redtext>
```

### Passing props to our styled components,
- For this we are going to add created at to our todo items as, we have defined this value for each of the todos,
- Then we are going to use that date value to make change in our css so, that it display the border-bottom to the older todos,
- Here is an step by step example,
```javascript
 <TodoItemContainer createdAt={todo.createdAt}>
```
- Then we made change to our styled css,
```javascript
const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
        ? 'none'
        : '2px solid red')};
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;
```

# Testing
Testing helps to ensure that the application works as intended, and that all components and features are functioning correctly. Testing helps to identify any bugs or errors in the application, which can then be addressed before the application is released.

## Testing the reducer,
- We did this by creating an .test.js file under test folder,
- Then we installed two module by running `npm install mocha chai `
- Then we passed the solid text values into props, inorder to test the reducers,
```javascript
import { todos } from '../reducers';
import { expect } from 'chai';

describe('The todos reducer', () => {
    it('Adds a new todo when CREATE_TODO action is received', () => {
        const fakeTodo = { text: 'hello', isCompleted: false };
        const fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo,
            },
        };
        const originalState = { isLoading: false, data: [] };

        const expected = {
            isLoading: false,
            data: [fakeTodo],
        };
        const actual = todos(originalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    });
});
```
- After this we hit `npm run test` then it shows that our test 1of1 has passed successfully.
```javascript
 PASS  src/todos/tests/reducers.test.js
  The todos reducer
    √ Adds a new todo when CREATE_TODO action is received (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.344 s, estimated 1 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

 
