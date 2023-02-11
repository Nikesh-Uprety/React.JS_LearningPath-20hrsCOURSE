import './App.css';
import { useState, useEffect, useReducer } from 'react';
function App() {
  // const [emotion, setEmotion]=useState("Happy");
  // useEffect (()=>{
  //   console.log(`It's ${emotion} right now`);  
  // },[emotion]
  // );
  // return (
  //   <div className="App">
  //     <h1>Hello from Nikesh, His emotion is {emotion}</h1>
  //     <button onClick={()=>setEmotion("Sad")}>Sad</button>
  //     <button onClick={()=>setEmotion("Excited")}>Excited</button>
  //   </div>
  // );
  // const [count, setCount]=useState(0);
  // return (
  //   <div className="App">
  //     <h1>You have clicked {count} times</h1>
  //     <button onClick={()=>setCount(count+1)}>Click</button>
  //     <button onClick={()=>setCount(count-1)}>Substract</button>
  //   </div>
  // );
  const [checked, setChecked] =useReducer((checked)=> !checked,false);
  return(
      <div className="App">
        <input type="checkbox" value={checked} onChange={setChecked}
        />
        <label>{checked ? "Checked": "Not Checked"}</label>
    </div>
  )
}

export default App;
