# Creating an React Components[[Day-1_Learning-React]]
- First Create an function, the function starting letter must be Capital.
- Return the JSX, in the function.
- Call or use that function where ever you want.
```javascript
<script type="text/babel">
         function Navbar(){
            return(
                <h1>Welcome to my page</h1>
            );
          }
        ReactDOM.render(
<Navbar />,
            document.getElementById("root")
        );
    </script>
```
## Creating a dymanic component using props.
- First pass the props in the function.
- In the main function, give the var name.
- Call that variable using props.var in the components.
```javascript
<script type="text/babel">
          function Topheader(props){
            return(
                <h1>Hello, {props.name}. Welcome to my page</h1>
            );
          }
          function Middleheader(props){
            return(
               <h1>This is created by {props.object}</h1>
            );
          }
          function App(){
            return(
                <div>
                    <Topheader name='Aaryan'/>
                    <Middleheader object='React jS Components'/>    
                </div>
            );
          }
        ReactDOM.render(
<App />,
            document.getElementById("root")
        );
    </script>
```
## Integers can be written by wrapping them.
```javascript
function App(){
            return(
                <div>
                   <Fotter year={new Date().getFullYear()}/>   %%This is a function the get the current year in Integers%% 
                </div>
            );
          }
```
## Woking with list
```javascript
const foods=[
            "Chicken Chowmen",
            "Kema Noodles",
            "Buff Momo",
            "Ghol Momo"
          ]
function Middleheader(props){
            return(
                <section>
                <ul>
                {props.foods.map((food)=> (
                    <li>{food}</li>
                    ))}
                    </ul>
                    </section>
            );
          }
 function App(){
            return(
                <div>
                    <Middleheader foods={foods}/>    
                </div>
            );
          }
        ReactDOM.render(
<App />,
            document.getElementById("root")
        );
```
## Adding Primary keys to the list.
- First the values with the keys should be unique and cannot interfere with other values.
- To do this we have created a seperate function, which includes id and titles,
- Then from that function we passed the id and title to out main list.
```javascript
function Middleheader(props){
            return(
               <section>
                <ul>
                {props.foods.map((food)=> (
                   <li key={food.id}>{food.title}</li>
                    ))}
                    </ul>
                    </section>
            );
          }
           const foods=[
            "Chicken Chowmen",
            "Kema Noodles",
            "Buff Momo",
            "Ghol Momo"
         ]
         const foodsObjects =foods.map((food, i) =>
          ({
            id:i,
            title:food
          })
          );
           function App(){
            return(
                <div>
                    <Middleheader foods={foodsObjects}/>    
                </div>
            );
          }
        ReactDOM.render(
<App />,
            document.getElementById("root")
        );
```