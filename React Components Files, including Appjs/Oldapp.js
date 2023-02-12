import "./App.css";
import { useState, useEffect, useReducer, useRef } from "react";

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
  // const [checked, setChecked] =useReducer((checked)=> !checked,false);
  // return(
  //     <div className="App">
  //       <input type="checkbox" value={checked} onChange={setChecked}
  //       />
  //       <label>{checked ? "Checked": "Not Checked"}</label>
  //   </div>
  // )
  //   const textTile = useRef();
  //   const hexColor = useRef();

  //   const submit = (e) => {
  //     e.preventDefault();
  //     const title = textTile.current.value;
  //     const color = hexColor.current.value;
  //     alert(`${title}, ${color}`);
  //     textTile.current.value = "";
  //     hexColor.current.value = "";
  //   };
  //   return (
  //     <div className="App">
  //       <form onSubmit={submit}>
  //         <input ref={textTile} type="text" placeholder="colot title..." />
  //         <input ref={hexColor} type="color" />
  //         <button>ADD</button>
  //       </form>
  //     </div>
  //   );
  // }

  // const [text, setText] = useState("");
  // const [color, setColor] = useState("#000000");
  // const submit = (e) => {
  //   e.preventDefault();
  //   alert(`${text}, ${color}`);
  //   setText("");
  //   setColor("#000000");
  // };
  // return (
  //   <div className="App">
  //     <form onSubmit={submit}>
  //       <input
  //         value={text}
  //         onChange={(event) => setText(event.target.value)}
  //         type="text"
  //         placeholder="colot title..."
  //       />
  //       <input
  //         value={color}
  //         onChange={(event) => setColor(event.target.value)}
  //         type="color"
  //       />
  //       <button>ADD</button>
  //     </form>
  //   </div>
  // );
//   function useInput(initialValue){
//     const [value, setValue]=useState(initialValue);
//     return [
//       {
//         value, 
//         onChange:(e)=> setValue(e.target.value)
//       },
//       ()=>setValue(initialValue)
//     ];
//   }
//   function App() {
//   const [titleprops, resetTitle] = useInput("");
//   const [colorprops, resetColor] = useInput("#000000");
//   const submit = (e) => {
//     e.preventDefault();
//     alert(`${titleprops.value}, ${colorprops.value}`);
//     resetTitle();
//     resetColor();
//   };
//   return (
//     <div className="App">
//       <form onSubmit={submit}>
//         <input
//         {...titleprops}
//           type="text"
//           placeholder="colot title..."
//         />
//         <input
//         {...colorprops}
//           type="color"
//         />
//         <button>ADD</button>
//       </form>
//     </div>
//   );
// }

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
