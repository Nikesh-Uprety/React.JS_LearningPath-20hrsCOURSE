# Setting up an Express server for Backend
- I created an folder outside the project folder named `my-blog-backend`.
- Then we runned the command `npm init -y` by opening the terminal inside the `my-blog-backend` folder.
- This create us an package.json file helps to track the different thing of our backend.
### Installing Express
- run the command `npm install express`
- Then we created src folder, in which `server.js` file is created.
- Also to import and export the files easily, we added `"type": "module",` in our `package.json` file after the `"main":"index.js"`.
# Testing an Express server with Postman
- I download and install postman, which is used to test our server.
- Then we created an simple get req, on localhost 8000, Saying `Hello!` inside the `server.js` file we previously created.
```javascript
import express from 'express';
const app = express();

app.get('/hello',(req, res)=>{
    res.send(`Hello!`);
})

app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
})
```
![text](https://images2.imgbox.com/eb/66/4WKEHzDe_o.png)
- Changing the req to get and then, testing in postman, 
- We have also, added some expression which helps to get the .json file request into out node server, 
```javascript
import express from 'express';
const app = express();
app.use(express.json());
app.post('/hello',(req, res)=>{
    console.log(req.body);
    res.send(`Hello ${req.body.name}`);// This saya, Hello!(name varibale) after sending req. COOL!
})
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
})
```
- The below is the request I sent from postman, in json format.
![image](https://images2.imgbox.com/e5/56/VohAi8Da_o.png)
```bash
PS C:\Users\Acer\Desktop\Learn_React\my-blog-backend> node src/server.js
Server is listening on port 8000
{ name: 'Nikesh' }
```
- What I did next is, as in the front-end part the articles were viewed by passaing their certain values at the URL, `localhost:3000/articles/learn-node` so we did the sam thing here,
```javascript
import express from 'express';
const app = express();
app.use(express.json());

app.post('/hello',(req, res)=>{
    console.log(req.body);
    res.send(`Hello ${req.body.name}`);
})
app.get('/hello/:name',(req, res)=>{
    const {name}=req.params;
    res.send(`Hello ${name}!!`);

})
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
})
```
# Upvoting the articles (same as liking)
- To do this we need a database inorder to store the upvotes for each article, so for faster development purpose we take our inbult memory to store the data. 
- I created an variable `articlesinfo` which consists of articel name, and upvotes,.
```javascript
import express from 'express';

let articlesInfo =[{
    name:'learn-react',
    upvotes:0,
},
{
    name:'learn-node',
    upvotes:0,
},
{
    name:'mongodb',
    upvotes:0,
}]
```
- Then we also create an put request On the URL `/api/articles/:name/upvotes` The :name denotes teh articel name in the articlesinfo
- Find command in js is used, to compare the articles name,
- and `article.upvote +=1;` expression is used to increase the upvote for every click.
- Here is an code example;
```javascript
import express from 'express';

let articlesInfo =[{
    name:'learn-react',
    upvotes:0,
},
{
    name:'learn-node',
    upvotes:0,
},
{
    name:'mongodb',
    upvotes:0,
}]

const app = express();
app.use(express.json());

app.put ('/api/articles/:name/upvote', (req, res)=>{
    const {name} =req.params;
    const article = articlesInfo.find(a => a.name === name);
    if(article){
        article.upvotes +=1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    }
    else{
        res.send('That article doesnt exist');
    }
});


app.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
});
```
- Testing on the portmam,
- Below is an example, 
![image](https://images2.imgbox.com/08/a2/Pxuhmkhq_o.png)
## Using nodemon to automatically run our server
- This is very handly and save a lot of time for a development, 
- Instead of stopping and run the server time and again every time we change somthing, it automantically detect s the changes and runs the server, 
- To instal this as a dev package, instead of production, here is the commandl
`npx install nodemon --save-dev`
```javascript
PS C:\Users\Acer\Desktop\Learn_React\my-blog-backend> npx nodemon src/server.js
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/server.js`
Server is listening on port 8000
[nodemon] restarting due to changes...
[nodemon] starting `node src/server.js`
Server is listening on port 8000
```
## Adding `dev` script to run the `npx nodemon src/server/js` command
- As the command is very long and hard to type and remember, what we do here is change the `package.json` file
- Inside the package.json file we added a new script `"dev":"nodemon src/server.js"` 
- Then by typing `npm run dev` we run the nodemon, which is shorter and easy to remember,
```javascript
PS C:\Users\Acer\Desktop\Learn_React\my-blog-backend> npm run dev

> my-blog-backend@1.0.0 dev
> npx nodemon src/server.js

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/server.js`
Server is listening on port 8000
```
# Adding comments to articles
- I added a new propertly name `comments` on the fake db we previously created, `articleinfo`,
- Again we created an post request and Used URL paramenter
```javascript
app.post('/api/articles/:name/comments', (req, res) =>{ });
```
- Then we passed name is using req.params and also, passed postedBy and comment text, 
```javascript
const {name} = req.params;
const {postedBy, text}= req.body;
```
- Lastyle, we compare the name of the articles using find command in js, and responsed the request.
- Here is the final code example,
```javascript
app.post('/api/articles/:name/comments', (req, res) =>{
    const {name} = req.params;
    const {postedBy, text}= req.body;
    const article = articlesInfo.find(a=> a.name ===name);
    
    if (article){
        article.comments.push({postedBy, text});
        res.send(article.comments);
    } else{
        res.send('That article doesnt exist');
    }
});
```
- And then we testes our server in `postman`, Here is an example,
![image](https://images2.imgbox.com/9e/16/iBXswWC6_o.png)
