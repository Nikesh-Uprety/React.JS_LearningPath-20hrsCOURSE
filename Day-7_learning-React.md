#### The completed project page link is given at the end of the Day-7.
#  Using useState hook in our project, *For Reference*[[Day-3_Learning-React]]
- So, We used useState to toggle between our appointment form,
- Here is an example,
```javascript
import { BiCalendarPlus } from "react-icons/bi";
import { useState } from "react";

const AddAppointment =()=> 
{
  let [toggleFrom, settoggleForm] = useState(false)  // This helps to to set the useStae default to false 
  return(
        <div>
        <button onClick={()=>{settoggleForm(!toggleFrom)}} // We created an onClick event which responds when the  button is clicked and toggle between the form. The expression {settoggleForm(!toggleFrom)} means, if toggleForm is `true`, then it will be set to `false`, and if it is `false`, then it will be set to `true`.
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md
        ${toggleFrom ? 'rounded-t-md' : 'rounded-md'}`}> 
          <div><BiCalendarPlus className="inline-block align-text-top" />  Add Appointment</div>
        </button>
        {
          toggleFrom && // This line helps to display the form when the value is true, or when the button is clicked
          <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Owner Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="ownerName" id="ownerName"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
        }
      </div>
    )
}
export default AddAppointment;
```
- The code below which is used above helps to do a simple task, to make the corner of the button rounded overall and when clicked it make the button border flat.
- So the `${toggleFrom ? 'rounded-t-md' : 'rounded-md'}`}> ` means that when toggleForm is true display 'rounded-t-md' else display 'rounded-md'.
```javascript
className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md
        ${toggleFrom ? 'rounded-t-md' : 'rounded-md'}`}> 
```

# Toggling the dropdown menu
- Again we used useState hook to do this,
- Here is the code of how we did it,
```javascript
import { BiSearch, BiCaretDown, BiCheck} from "react-icons/bi";
import { useState } from "react";
const Dropdown =({toggle})=>{ 
  if(!toggle){
    return null;
  }
  return(
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Pet Name <BiCheck /></div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Owner Name  <BiCheck /></div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Date <BiCheck /></div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem">Asc <BiCheck /></div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Desc <BiCheck /></div>
      </div>
    </div>
  )
}


const Search = ()=>{
let [Ddropdown, setDropdown]=useState(false);

    return(
        <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input type="text" name="query" id="query" value=""
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" placeholder="Search" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button onClick={()=>{setDropdown(!Ddropdown)}} 
            type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Sort By <BiCaretDown className="ml-2" />
            </button>
           
            <Dropdown toggle={Ddropdown}/>
          
          </div>
        </div>
      </div>
    </div>
    );
}
export default Search;
```
- We again created an onClick event on the button, when the Ddropdown is true , then it will be set to `false`, and if it is `false`, then it will be set to `true`.
```javascript
 <button onClick={()=>{setDropdown(!Ddropdown)}} 
```
- This code passes the Ddropdown by storing it in the variable `toggle` which can be accessible to the above function.
```javascript
<Dropdown toggle={Ddropdown}/> 
```
- Then, if the toggle is true the value will be null, and if it is false the menus or whatever that content is will be displayed. Simple logic.
```javascript
const Dropdown =({toggle})=>{ 
  if(!toggle){
    return null;
  }
```
## useEffect and useCallback Hooks
- We have used these hooks in fetching the data.json file as a file from the server, instead of our localhost because the data is mostly come into our project form either restapi ot server,
- The example is given below;
```javascript
let [appointmentList, setAppoinmentsList]=useState([]);
  const fetchData =useCallback(()=>{
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppoinmentsList(data)
    });
  }, [])
  useEffect(()=>{
    fetchData()
  },[fetchData]);
```
# Deleting the Records, 
- Here we created an onclick event in the `info.js` file,
- We also passed the onDeleteAppointment in the expression so that it could to reach to globle ot `app.js` file.
```javascript
import { BiTrash } from "react-icons/bi";
const Info =({appointment, onDeleteAppointment})=>{
    return(
        <li className="px-3 py-3 flex items-start">
        <button onClick={()=>onDeleteAppointment(appointment.id)} type="button"
          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <BiTrash /></button>
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">{appointment.petName}</span>
            <span className="flex-grow text-right">{appointment.aptDate}</span>
          </div>
          <div><b className="font-bold text-blue-500">Owner:</b> {appointment.ownerName}</div>
          <div className="leading-tight">{appointment.aptNotes}</div>
        </div>
      </li>
    )

}
export default Info;
```
- Then on the main js file `App.js` we passed that onDeleteAppointment and write an expression which deletes the record on clicking the button.
> The `setAppointmentsList` function takes a new list of appointments as an argument, which is obtained by using the `filter` method to remove the appointment with the given `appointmentId`. The `filter` method creates a new array by filtering out all the elements that do not match a given condition, which in this case is the appointment with the specified ID. The expression `appointment => appointment.id !== appointmentId` is an arrow function that takes an `appointment` object as its parameter and returns a Boolean value based on whether the `id` property of the appointment object is not equal to the `appointmentId` parameter. Overall, this code sets up a function that can be used as a callback when an appointment needs to be removed from the list. When the function is called, it updates the `appointmentsList` state by filtering out the appointment with the specified ID.
- The example is shown in the code below:

```javascript
<ul className="divide-y divide-gray-200">
        {appointmentList
          .map(appointment => (
            <Info key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={
              appointmentId=>
              setAppoinmentsList(appointmentList.filter(appointment=>appointment.id !== appointmentId))
            }
            />
          ))
        }
      </ul>
```
# Setting up search box function,
- First we created an `onChange` event on the input search filed of the `search.js` file.
```javascript
<input type="text" name="query" id="query" value={query} onChange={(event) => { onQueryChange(event.target.value) }}
```
- Then we passed the onChange in the expression of the function.
```javascript
const Search = ({ query, onQueryChange })
```
- Then we create another state 
```javascript
 let [query, setQuery] = useState("");
```
- Then we added an expression to our component, to pass the values of the query,
```javascript
      <Search query={query}
        onQueryChange={myQuery => setQuery(myQuery)}/>
```
- Then we created seperate function for the array, so that It donot, change the big/other components.
```javascript
const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  )
```
- Finally, instead of mapping the appointment list, we now map the filteredAppointments, which does the function of searching the type value.
```javascript
    {filteredAppointments
          .map(appointment => (
            <Info key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                appointmentId =>
                  setAppointmentList(appointmentList.filter(appointment =>
                    appointment.id !== appointmentId))
              }
            />
          ))
        }
```
# Setting up the sort, 
- Firstly we created two states, sortby and orderby
```javascript
    let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");
```
- Then we used javascript sort function in the filteredAppointment component, 
```javascript
function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })
```
# Programing the sorting interface
- Firstly adding sortby and orderby into out search components,
```javascript
  <Search query={query}
        onQueryChange={myQuery => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={mySort => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
      />
```
- Then, we passes sortby and sortbychange/orderby and orderbychange into our `search.js`
```javascript 
const Search = ({ query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange }) => {
  // Here
  let [toggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input type="text" name="query" id="query" value={query}
          onChange={(event) => { onQueryChange(event.target.value) }}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" placeholder="Search" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button type="button" onClick={() => { setToggleSort(!toggleSort) }}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={mySort => onSortByChange(mySort)}
              orderBy={orderBy}
              onOrderByChange={myOrder => onOrderByChange(myOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```
- Creating an event whenever some clicked on those buttons and passing the name of the fields we want to sort by,
```javascript
const DropDown = ({ toggle, sortBy, onSortByChange, orderBy, onOrderByChange }) => {
  if (!toggle) {
    return null;
  }
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div onClick={() => onSortByChange('petName')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Pet Name {(sortBy === 'petName') && <BiCheck />}</div>
        <div onClick={() => onSortByChange('ownerName')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Owner Name {(sortBy === 'ownerName') && <BiCheck />}</div>
        <div onClick={() => onSortByChange('aptDate')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Date {(sortBy === 'aptDate') && <BiCheck />}</div>
        <div onClick={() => onOrderByChange('asc')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem">Asc {(orderBy === 'asc') && <BiCheck />}</div>
        <div onClick={() => onOrderByChange('desc')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">Desc {(orderBy === 'desc') && <BiCheck />}</div>
      </div>
    </div>
  )
}
```
# Adding items in the form,
- First we created an state of formData which contains, `ownerName`, `petName`, `aptDate`, `aptTime` and `aptNotes`.
```javascript
const clearData = {
    ownerName: '',
    petName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: ''
  }
  let [toggleForm, setToggleForm] = useState(false)
  let [formData, setFormData] = useState(clearData)

```
- Creating an `onChange` event, so take, analysis and pass the information to the target value for all the field seperately.
```javascript
<div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="ownerName" id="ownerName"
                onChange={(event) => { setFormData({ ...formData, ownerName: event.target.value }) }}
                value={formData.ownerName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
```
- Setting up the submit button and creating an component for that button.
```javascript
<button type="submit" onClick={formDataPublish} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                Submit
            </button>
```
- The component
```javascript
function formDataPublish() { // This is the onClick fucntion on the submit button.
    const appointmentInfo = {
      id: lastId + 1,
      ownerName: formData.ownerName,
      petName: formData.petName,
      aptDate: formData.aptDate + ' ' + formData.aptTime,
      aptNotes: formData.aptNotes
    }
    onSendAppointment(appointmentInfo);
    setFormData(clearData);
    setToggleForm(!toggleForm)
  }

```
- Then we passed the onSendAppoinment and lastId to the AddAppoinment expression and then to the `App.js`.
```javascript
const AddAppointment = ({ onSendAppointment, lastId })
```
`App.js`
```javascript
<AddAppointment
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
```
# And here is the completed simple petappointment project link, which I hosted in netlify.
https://reactpetappointmentapp.netlify.app
