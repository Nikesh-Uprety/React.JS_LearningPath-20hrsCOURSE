# Learn more about React Hooks [[Day-3_Learning-React#Using useState hook, and doing cool stuffs|Reacthooks]]
> React hooks are functions that allow you to use state and other React features in functional components. In other words, hooks are a way to "hook into" React's internal state and lifecycle management system from a functional component, rather than a class component.
## Creating an chekbox using useState,
-   In this code, I have an import statement that brings in the "useState" hook from the React library, which will allow us to add state to our functional component.
-    I have used the "useState" hook to create a new state variable called "checked" and a function called "setchecked" that can update its value. The initial value of "checked" is set to "false".
-    I also have an input element that has a "value" prop that is set to the value of the "checked" state variable, and an "onChange" handler that will update the "checked" variable whenever the checkbox is toggled.
-   lastly, I have a paragraph element that displays either "checked" or "Not checked" based on the current value of the "checked" state variable. If it is true, it displays "checked"; otherwise, it displays "Not checked".
```javascript
import './App.css';
import { useState } from 'react';
function App() {
  const [checked, setchecked]=useState(false);
  return (
    <div className="App">
      <input type="checkbox" value={checked} onChange={()=> setchecked(!checked)}/>
      <p>{checked ? "checked": "Not checked"}</p>
    </div>
  );
}

export default App;
```
## Working with components trees(star rating components)
- I start by importing the start icons from the react-icons library.
- Then I created different components functions. 
- On the function StartRating ,it  that takes a "totalStars" prop (defaulting to 5), uses the "useState" hook to create a state variable "sel" (initially 0) and a function "setsel" to update it, creates an array of stars using "createArray", and maps over that array to render a "Star" component for each star. The "selected" prop of each "Star" component is set based on whether the index of the star is less than the value of "sel". When a star is clicked, the "onSelect" function passed to the "Star" component is called with the index of the star + 1, and this value is used to update the "sel" state variable.
-   ALso I have created  a function "createArray" that takes a length parameter and returns an array of that length using the spread operator and the "Array" constructor.
-   The "Star" functional component that takes a "selected" prop (defaulting to false) and an "onSelect" prop (a function to be called when the star is clicked), and returns a "FaStar" icon colored red or grey depending on the "selected" prop, with an "onClick" handler calling the "onSelect" function.
- Lastly the main  "App" functional component eturns a "StarRating" component with a "totalStars" prop of 5.
- Here is the example below,
```javascript
import './App.css';
import { useState } from 'react';
import {FaStar} from "react-icons/fa"

const createArray = (length)=>[
  ...Array(length)
];
function Star({selected =false, onSelect}){
  return (
    <FaStar color ={selected ? "red": "grey"} onClick={onSelect}/>
  );
}

function StarRating({totalStars =5 }){
  let [sel,setsel]=useState(0);

  return (
  <>
  
  {
    createArray(totalStars).map((n,i)=>(
      <Star key={i} selected={sel >i} onSelect={()=> setsel(i + 1)} />
    ))}
    <p>{sel} of {totalStars}</p>
</>
  );
}
function App() {
  return <StarRating totalStars={5}/>;
}

export default App;

```
## Using useState to fetch data,
- I am going to make an react functional component that fetches data from the Github API and displays a list of user logins. It uses `useState` to define the initial state of `data` as an empty array, and `useEffect` to fetch data from the API once the component is mounted.
- Here is the code,
```javascript
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users`)
      .then((response) => response.json())
      .then(setData);
  },[]);
  if (data) {
    return (
      <div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
      <button onClick={()=>setData([])}>Remove Data</button>
      </div>
    );
  }
  return <p>No Users</p>;
}
```

## Using the hook useReducer,
> The `useReducer` hook in React is a way to manage state in functional components that involves updating the state based on a set of actions. It is an alternative to using the `useState` hook, and is often used when the state is more complex and involves multiple values that depend on each other.
1.  `const [number, setnumber]=useReducer(...)` - This line declares a state variable called `number` and a state update function called `setnumber` using the `useReducer` hook. The initial state value of `number` is set to 0.
    
2.  `(number, newnumber)=> number + newnumber` - This is the reducer function used by the `useReducer` hook. It takes the current state value (`number`) and a new state value (`newnumber`) as arguments and returns the new state value, which is the sum of the current state value and the new state value.
    
3.  `<h1 onClick={()=> setnumber(1)}>{number}</h1>` - This line renders an `h1` element with the `number` state value as its content. When the user clicks on the `h1` element, the `setnumber` function is called with a new state value of 1. This causes the `number` state value to be updated to the sum of the current value and 1, as specified in the reducer function.
- Here is the code example,
```javascript
function App() {
  const [number, setnumber]=useReducer(
    (number, newnumber)=> number + newnumber,0
  );
  return (
    <h1 onClick={()=> setnumber(1)}>{number}</h1>
  );
}
```

## Using useRef hook,
> In React, `useRef()` is a hook that returns a mutable ref object whose `current` property is initialized to the passed argument. This returned object can be used to store any mutable value similar to instance variables in a class component. Unlike state, changes to the value stored in a ref do not trigger a re-render of the component.
-   So, in this exercise I have imported the `useRef` hook from React.
-   The `App` function defines two variables `sound` and `color` as references to two HTML input elements, using the `useRef` hook.
-   Then the`submit` function is called when the form is submitted, and it prevents the default behavior of the form. It retrieves the values of the `sound` and `color` fields and displays an alert message with those values.
-   Finally, The `soundVal` and `colorVal` variables are used to display a message in the alert box, which is a combination of the sound value and color value.
-   Lastly, The `sound` and `color` fields are reset to empty after the form is submitted.
```javascript
import { useRef } from "react";

function App() {
  const sound = useRef(); 
  const color = useRef(); 

  const submit=(e) =>{
    e.preventDefault();
    const soundVal = sound.current.value;
    const colorVal = color.current.value;
    alert(`${soundVal} sounds like ${colorVal}`)
    sound.current.value="";
    color.current.value="";
  }
  return (
    <form onSubmit={submit}>
      <input ref={sound} type="text" placeholder="Sound..." />
    <input ref={color} type="color" />
    <button>Add</button>
    </form>

    );
}
export default App;

```