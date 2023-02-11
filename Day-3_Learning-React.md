# Creating React project
- First we need to install the node js,
- Then located in which folder you want setup your react project.
- Then hit shift + right click, and from the options choose open powersheel window here,
- Then run the commands  ( *for reference*- [[Staring with react js]] )
> npx create-react-app (Your-Project-Name)


# Destructuring arrays and objects.
> Using props, we can label and display objects from different components, in our project.
```javascript
 <App library="React"/>
 // The above code refers to different file, which is app.js
 import './App.css';
 function App(props) {
  return (
    <div className="App">
      <h1>Hello from Nikesh, He is learning {props.library}</h1>
    </div>
  );
}
// Also we can directly use the defined values instead of props.
import './App.css';
function App({library}) {
  return (
    <div className="App">
      <h1>Hello from Nikesh, He is learning {library}</h1>
    </div>
  );
}
```
# Working with arrays ,
```javascript
const cities=["Itahari","Kathmandu","Pokhara"];
console.log(cities[0]); // This helps to print the first city which is Itahari
```
# Arryas Destructuring
```javascript
const [firstCity, secondCity, thirdCity]=["Itahari","Kathmandu","Pokhara"];
console.log(firstCity);
```
# Using useState hook, and doing cool stuffs
> The `useState` hook in React is a built-in hook that lets you add state to your functional components. In React, state is an object that holds data that changes over time and influences the behavior and render of your component.

The `useState` hook returns an array with two elements:

-   The first element is the current value of the state, which is stored in a variable that you can name.
-   The second element is a function that you can use to update the state, which is stored in another variable.
```javascript
import { useState } from 'react'; // importing the hook
function App() {
  const [emotion, setEmotion]=useState("Happy"); // Initial emotion is Happy
  return (
    <div className="App">
      <h1>Hello from Nikesh, His emotion is {emotion}</h1>
      <button onClick={()=>setEmotion("Sad")}>Sad</button> /// Button to change the emotion
      <button onClick={()=>setEmotion("Excited")}>Excited</button>
    </div>
  );
}
```
> Another example to count and substract how many times the user have cliked the button,
```javascript
const [count, setCount]=useState(0);
  return (
    <div className="App">
      <h1>You have clicked {count} times</h1>
      <button onClick={()=>setCount(count+1)}>Click</button>
      <button onClick={()=>setCount(count-1)}>Substract</button>
    </div>
  );
```
# Working with useEffect hook in React.
> The `useEffect` hook in React is a built-in hook that lets you perform side effects in your functional components. Side effects are actions that affect the state of your application outside of the component, such as data fetching, subscription, or manually changing the DOM.

For the Basic Example
```javascript
import { useState, useEffect } from 'react';
function App() {
  const [emotion, setEmotion]=useState("Happy");
  useEffect (()=>{
    console.log(`It's ${emotion} right now`);  
  },[emotion]
  );
  return (
    <div className="App">
      <h1>Hello from Nikesh, His emotion is {emotion}</h1>
      <button onClick={()=>setEmotion("Sad")}>Sad</button>
      <button onClick={()=>setEmotion("Excited")}>Excited</button>
    </div>
  );
```
# Using useState to make cool checked, unchecked function
```typescript
 const [checked, setChecked] =useState(false);
  return(
      <div className="App">
        <input type="checkbox" value={checked} onChange={()=>{
          setChecked((checked)=> !checked)
        }}/>
        <label>{checked ? "Checked": "Not Checked"}</label>
    </div>
  )
}
```
# Using useReducer to make code clearner and free of bugs
```javascript
const [checked, setChecked] =useReducer((checked)=> !checked,false);
  return(
      <div className="App">
        <input type="checkbox" value={checked} onChange={setChecked}/>
        <label>{checked ? "Checked": "Not Checked"}</label>
    </div>
  )
}
```
