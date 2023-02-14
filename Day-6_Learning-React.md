# Using react icons components
- This is basically an librabry of a bunch of icon which we can use in our project very easily.
- First we need to install the components, and the command is
`npm install react-icons --save`
- This is add this to our project and an example is shown below;
```javascript
import { BiArchiveOut } from "react-icons/bi";
function App() {
  return (
    <div className="App">
      <h1>< BiArchiveOut/>Your Appointments</h1>
    </div>
  );
}
export default App;
```
![image](https://images2.imgbox.com/63/61/9e25jwtX_o.png)

# Using tailwind CSS in our project
- First thing is installing, you can find the installation on their offical webste, and here is the code for it,
`npm install -D tailwindcssnpx `
2nd command
`tailwindcss init`
- Then some tailwind objects is added to our indes.css file,
```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Then we added some plugins and purge some stuffes inside the config file of the tailwind Css for out project,
```javascript
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')]
}
```
- And here is an example of using the tailwind css in our project, 
```javascript
import { BiArchiveOut } from "react-icons/bi";
function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
      <BiArchiveOut className="inline-block text-red-500 align-top"/>Your Appointments</h1>
    </div>
  );
}
export default App;

```
# Creating Pet Appointment booking project
- First of all we created search components, in which we imported some icons and tailwind css to give a style.
- We make two functions Dropdown and Search which perform the task as the title, and all these are html code.
- We exported the search components and used in out `App.js` file, 
- Here is an example;
```javascript
import { BiSearch, BiCaretDown, BiCheck} from "react-icons/bi";
const Dropdown =()=>{
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
            <button type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <Dropdown/>
          </div>
        </div>
      </div>
    </div>
    );
}
export default Search;
```
![image](https://images2.imgbox.com/94/13/1GRUtHy2_o.png)
- Again we created another compont called Addappointment, which gives us an form the enter the data,
- We created an function AddAppointment which containes thes Html/Css codes.
- Here is an example with code,
```javascript
import { BiCalendarPlus } from "react-icons/bi";
const AddAppointment =()=>
{
    return(
        <div>
        <button className="bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md">
          <div><BiCalendarPlus className="inline-block align-text-top" />  Add Appointment</div>
        </button>
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
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Pet Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="petName" id="petName"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="date" name="aptDate" id="aptDate"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input type="time" name="aptTime" id="aptTime"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
  
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Appointment Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea id="aptNotes" name="aptNotes" rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Detailed comments about the condition"></textarea>
            </div>
          </div>
  
  
          <div className="pt-5">
            <div className="flex justify-end">
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}
export default AddAppointment;
```
![image](https://images2.imgbox.com/d2/9b/PwCSopGt_o.png)
- Then we created a json file which containes json format data of petowner, petname, desp, date etc.
- We then imported that file into out `App.js` file and mapped the data of that json file into appointment which then displays that data to our project, using simple html, css and `.map`, `{appointment.requireddatafiled}` options.
- Here is an example, with code.
```javascript
import { BiCalendar,BiTrash } from "react-icons/bi";
import Search from "./components/Search";
import appointmentList from "./data.json";
import AddAppointment from "./components/AddAppointment";
function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <BiCalendar className="inline-block text-red-500 align-top" />Your Appointments</h1>
      < AddAppointment />
      < Search />
      <ul className="divide-y divide-gray-200">
        {appointmentList
          .map(appointment => (
            <li className="px-3 py-3 flex items-start">
              <button type="button"
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
          ))
        }
      </ul>
    </div>
  );
}
export default App;
```
![image](https://images2.imgbox.com/b7/26/TqZC0Fse_o.png)