# Installing the react router
> React Router is a popular routing library for React that makes it easy to add routing to your React application. With React Router, you can define the different routes in your application, and specify which component should be rendered when the user navigates to a particular URL.
- Here is the command to install react router
- `npm instal react-router-dom@(Version)` 
> React Router works by using components to define the different routes in your application. There are several components provided by React Router, including `Route`, `Link`, and `Switch`, which are used to define the routes, create links between the routes, and control which component should be rendered when multiple routes match.
## Making different componets in our page to navigate.
```javascript
import React from "react";
function Home() {
return (
  <div>
    <h1>Home</h1>
  </div>
);
}
function About() {
return (
  <div>
    <h1>About</h1>
  </div>
);
}
function Contact() {
return (
  <div>
    <h1>Content</h1>
  </div>
);
}
function App() {
return (
<Home/>
);
}
export default App;
```
# Configuring the router,
> By doing the necessary configuration fot he router in out index.js file, we can navigate to different pages which we have set.
- For example, we created different `components` in our `App.js` file.
```javascript
import React from "react";
function Home() {
return (
  <div>
    <h1>My website</h1>
  </div>
);
}
export function About() {
return (
  <div>
    <h1>About Us</h1>
  </div>
);
}
export function Contact() {
return (
  <div>
    <h1>Content Us</h1>
  </div>
);
}
export function App() {
return (
  <div>
<Home/>
  </div>
);
}
```
- Then we configured the `router` in our `index.js` file
- We imported `BrowserROuter`,`Routes` and `Route` to our project.
- So here is the overal configuration of the react router in our project.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, About, Contact} from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
  </BrowserRouter>,
);
```
# Creating link from where we can navigate the pages.
- Doing so we imported  `link` component from `react-router-dom` which helps us to navigated through the pages.
- So here is an example:
```javascript
import React from "react";
import { Link } from "react-router-dom";
function Home() {
return (
  <div>
    <nav>
      <Link to ="/">Home</Link>
      <Link to ="/about">About</Link>
      <Link to ="/contact">Contact</Link>
    </nav>
    <h1>My website</h1>
  </div>
);
}
export function About() {
return (
  <div>
    <nav>
      <Link to ="/">Home</Link>
      <Link to ="/about">About</Link>
      <Link to ="/contact">Contact</Link>
    </nav>
    <h1>About Us</h1>
  </div>
);
}
export function Contact() {
return (
  <div>
    <nav>
      <Link to ="/">Home</Link>
      <Link to ="/about">About</Link>
      <Link to ="/contact">Contact</Link>
    </nav>
    <h1>Content Us</h1>
  </div>
);
}
export function App() {
return (
  <div>
<Home/>
  </div>
);
}
```
# Nesting links with React Router
- This helps to add a nesting page inside a page.
- The configuration with example is shown below, where I added a nesting page `\history` in the `\about` page in my project.
- Also the `Outlet` from `react-router-dom` is added to our `App.js` which helps to create an outlet of out page.
```javascript
import React from "react";
import { Link , Outlet} from "react-router-dom";
function Home() {
return (
  <div>
    <nav>
      <Link to ="/">Home</Link>
      <Link to ="/about">About</Link>
      <Link to ="/contact">Contact</Link>
    </nav>
    <h1>My website</h1>
  </div>
);
}

export function About() {
return (
  <div>
    <nav>
      <Link to ="/">Home</Link>
      <Link to ="/about">About</Link>
      <Link to ="/contact">Contact</Link>
    </nav>
    <h1>About Us</h1>
    <Outlet />
  </div>
);
}
export function History(){

  return(
    <div>
      <h1>Our History</h1>
    </div>
  );
}
```
- Then in the `index.js` file new route `\history` is added inside the `/about` route,
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, About, Contact, History} from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />}>
      <Route path='history' element={<History />} />
    </Route>
    <Route path="/contact" element={<Contact />} />
  </Routes>
  </BrowserRouter>,
);
```
# Introducing React Testing library
- Basically what we can do from this library is that, we can perform testing in our project, and it shows any possible error that has and shows passed if out testfile passed the test.
- Here is the example, I have created two file `Star.js` & `Star.test.js` which we are perform test on.
- In this case we tested small task, `Two strings`.
- Here is an example

`Star.js file`
```javascript
import React from "react";
export function Star(){
    return (<h1>Cool Star</h1>);
}
```
`Star.test.js file`
```javascript
import React from "react";
import { render } from "@testing-library/react";
import { Star } from "./Star";
test("renders an h1", () => {
    const {getByText} = render(<Star />);
    const h1= getByText(/Cool Star/);
    expect(h1).toHaveTextContent("Cool Star");
});
```