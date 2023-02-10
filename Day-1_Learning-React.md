## You can add the href link to you html to get access to all the react packaged and functions.

```html
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn React 20 Day Challenge</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
</head>
<body>
    <h1>This is a new react app</h1>
</body>
<script>
</script>
</html>
```
## I used create elements function[[Java-Script_Crash Code]] to create an elements using react.
> Notes
- This was created using the React Package.
- We created a variable named heading, ul for the easyness.
- Then we created another variable named Ul which, then we added style properties.
```javascript
<script type="text/javascript">          
        let heading = React.createElement("h1",null,"This was created using React App");      
        ReactDOM.render(
            heading,
            document.getElementById("root")
        );
    </script>
    <script type="text/javascript">          
        let ul = React.createElement("h1",{ style: {color: "red"}}, React.createElement("li",null,"Tuseday"));      
        ReactDOM.render(
            ul,
            document.getElementById("root")
        );
        </script>
```
## Using babel in React app
- This helps to display the typescript in the browser.
### Adding Babel to our project.
```html
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn React 20 Day Challenge</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
   <div id="root"></div>
    <script type="text/babel">
       ReactDOM.render(
            <ul>
                <li>Hi</li>
                <li>Hello</li>
                <li>Hy</li>
            </ul>,
            document.getElementById("root")
        );
    </script>
</body>
</html>
```





Components