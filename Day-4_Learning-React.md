# Handling Forms in React
## useRef
> I have used useRef hook in this function, The `useRef` hook in React is a built-in hook that lets you access the value of a DOM element or a component instance. A ref is a special object that holds a mutable value in its `current` property, which can be used to store a reference to a DOM element, a component instance, or any other value. 

Here is the example, to get the current values of two input field, `Text` and `Color`; which we then `Prompt` to the user.
```javascript
import { useRef } from "react";
function App() {
const textTile = useRef(); // Creating this vairable for storing the values of the useRef Hook.
const hexColor = useRef(); // Creating this vairable for storing the values of the useRef Hook.
  const submit = (e) => {  
    e.preventDefault();
    const title = textTile.current.value;
    const color = hexColor.current.value;
    alert(`${title}, ${color}`);
    textTile.current.value = "";
    hexColor.current.value = "";
  };
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input ref={textTile} type="text" placeholder="colot title..." />
        <input ref={hexColor} type="color" />
        <button>ADD</button>
      </form>
    </div>
  );
}
export default App;
```
## useState 
(*For reference * [[Day-3_Learning-React]])
Here is the example, to get the current values of two input field, `Text` and `Color`; which we then `Prompt` to the user.
```javascript
import { useState } from "react";
function App() {
const [text, setText] = useState("");
const [color, setColor] = useState("#000000");
  const submit = (e) => {
    e.preventDefault();
    alert(`${text}, ${color}`);
    setText("");
    setColor("#000000");
  };
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
          placeholder="colot title..."
        />
        <input
          value={color}
          onChange={(event) => setColor(event.target.value)}
          type="color"
        />
        <button>ADD</button>
      </form>
    </div>
  );
} 
export default App;
```
# Building a Custome hook
> A hook is just a function that we can use for any sort of  repeatable code.
- Hooks are very reusable,
- They can be shared across the project,
- We can write test for the function,
- This is very flexible and reusable across project and across components.
```javascript
   function useInput(initialValue){
    const [value, setValue]=useState(initialValue);
    return [
      {
        value, 
        onChange:(e)=> setValue(e.target.value)
      },
      ()=>setValue(initialValue)
    ];
  }
  function App() {
  const [titleprops, resetTitle] = useInput("");
  const [colorprops, resetColor] = useInput("#000000");
  const submit = (e) => {
    e.preventDefault();
    alert(`${titleprops.value}, ${colorprops.value}`);
    resetTitle();
    resetColor();
  };
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
        {...titleprops}
          type="text"
          placeholder="colot title..."
        />
        <input
        {...colorprops}
          type="color"
        />
        <button>ADD</button>
      </form>
    </div>
  );
}

export default App;
```
# Fetching data with hooks
- These hooks is important can be used in complex task such as fetching Api.
```javascript
import { useState, useEffect } from "react";
function App(){
  const [data, setData] =useState(null);
  useEffect(()=>{
    fetch(`https://api.github.com/users/Nikesh-Uprety`
    ).then((response)=> response.json())
    .then(setData);
  },[]);
  if (data)
  return(
    <pre>{JSON.stringify(data, null,2)}</pre>
  );
  return(
    <div className="App">
      <h1>Hello</h1>
    </div> 
  )
}
export default App;
```
## Displaying the fetch data, to our project
- This is a very esay method of grabbing the data directly from the Api and displaying the required data. 
```javascript
function GithubUser({name, following, avatar}){
  return(
    <div>
      <img height={200} src={avatar} alt="" />
      <h1>{name}</h1>
      <p>Followers:{following}</p>
    </div>
  )
}
function App(){
  const [data, setData] =useState(null);
  useEffect(()=>{
    fetch(`https://api.github.com/users/Nikesh-Uprety`
    ).then((response)=> response.json())
    .then(setData);
  },[]);
  if (data)
  return(
    <GithubUser name={data.name}
    following={data.following}
    avatar={data.avatar_url}/> 
  );
  return(
    <div className="App">
      <h1>Hello</h1>
    </div>
    
  )
}
export default App;
```
## Handling loading states  and errors to our projects.
- This is very handly if the data we `fecth` is very large and need some time to be fetched, we can use `useState` function inorder to display some kind of message or animation during that time.
- Also, `error` can be displayed of there is some kind of error in the `api`, or something that cause errors.
```javascript
import { useState, useEffect } from "react";
function GithubUser({ name, following, avatar }) {
  return (
    <div>
      <img height={200} src={avatar} alt="" />
      <h1>{name}</h1>
      <p>Followers:{following}</p>
    </div>
  );
}
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`https://api.github.com/users/Nikesh-Uprety`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  if (loading) return <h1>Loading....</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;
  return (
    <GithubUser
      name={data.name}
      following={data.following}
      avatar={data.avatar_url}
    />
  );
}
export default App;
```
## Working with render props
- Here's an example of a simple `render props` component that displays a bunch of list of the nepal peaks and display empty if there is no items in that particulat `list`.
```javascript
const nepal_peaks =[
  {name:"Sagarmatha", elevation:8848},
  {name:"Makalu", elevation:7856},
  {name:"Annapurna", elevation:6987},
  {name:"Macchapuchera", elevation:7655}
];
function List({data, renderItem, renderEmpty}){
  return !data.length ? (
    renderEmpty
  ):(
    <ul>
      {data.map((item)=>
      (
        <li key={item.name}>
          {renderItem(item)}
        </li>
      )
      )}
    </ul>
  )
}
function App() {
return (
  <List data ={nepal_peaks}
  renderEmpty={<p>This is empty list...</p>}
  renderItem={(item)=>(
    <>
    {item.name} -{item.elevation} meters.
    </>
  )}
  />
);
}
export default App;

