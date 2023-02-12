
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
