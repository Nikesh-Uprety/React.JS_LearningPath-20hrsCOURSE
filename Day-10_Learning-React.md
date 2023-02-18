# Setting up MongoDB on our computer
- I downloaded the mongodb file from the offical website,
- Then I also downloaded the `mongosh` installation archive for my operating system.,
- And then added  `mongosh` binary to the `PATH` environment variable,
- Then install the mongodb which I previously downloaded.
- To check if the PATH is successfully added or not, open the command panel and type `mongosh` if it runs the command, the path is added successfully,
- Below is the example;
```bash
C:\Users\Acer\Desktop\Learn_React\my-blog-backend>mongosh
Current Mongosh Log ID: 63f0c0c9e06478bc7379b1af
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1
Using MongoDB:          6.0.4
Using Mongosh:          1.7.1

For mongosh info see: https://docs.mongodb.com/mongodb-shell/

------
   The server generated these startup warnings when booting
   2023-02-18T17:44:58.476+05:45: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------
```
- Then I created an folder for the mongodb named `mongo-db-data`.
- I passed the `articles.info` data into the DB.
- On the terminal, type `mongosh`, after it is running successfulyy
- Then, type `use react-blog-db`
- Now, the database is created using `db.articles.insertMany(data)`
```javascript
db.articles.insertMany(
[{
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
)
```
- Now that is done, we go into our `server.js` file and instal the npm package for mongo db
- `npm install mongodb`
- The after importing the `MongoClient` I created an get request to connect our mongoDB, and specify the database we previously created.
- I also added an URL parament which taske `:name` as an id to find the articles, in our database. 
- Here is an example, 
```javascript
app.get('/api/articles/:name',async (req,res)=>{
    const{name}=req.params;

    const client= new MongoClient('mongodb://127.0.0.1:27017'); // Keep it to 127.0.0.1 donot change it otherwise you may face ERROR!
    await client.connect();
    const db= client.db('reac-blog-db');

    const article = await db.collection('articles').findOne({name});
    if(article){ // this condition checks if the id match or not, and if not it throws an 404 ERROR
        res.json(article);

    }else{
        res.sendStatus(404);
    }
    res.json(article);
});
```
- I send requested in postmane and verified that everything is working fine,
- Here is the screenshort.
![Image](https://images2.imgbox.com/04/62/cBofADz5_o.png)
# Updating the upvoting and comment 
## Upvoting
- First I replaced the line which store the data in the previous `fake-in Memory` to the actual query of the database.
- Then I write the code to increament the upvote .
```javascript
await db.collection('aritcles').updateOne({name}, {
        $inc :{ upvotes: 1 },
```
- Then I made an file named `db.js` which connects the database, and instead of writing the connect code of 3line in each request, I can include this file once and for all.
- Inside of that file, the code are
```javascript
import { MongoClient } from 'mongodb';

import { MongoClient } from 'mongodb'; 
let db;
async function connectToDB(cb){
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('reac-blog-db');
    cb();
}
export {
    db,
    connectToDB,
};
```
- Now what I did next is setting write an query which select name, 
```javascript
const article = await db.collection('articles').findOne({ name });
```
- And then the final code for upvoting the article is 
```javascript
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
   
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`); // This send the messgae with updated upvotes;
    } else {
        res.send('That article doesn\'t exist');
    }
});
```
- Here is the screenshort of the `PUT` req in postman, to check everything works just fine,
![image](https://images2.imgbox.com/7f/b9/Vz0iKsBe_o.png)
## Comments
- The comments part is also the same as the upvotes, expect we instead of `$inc` I used `$push`
- Here is the code,
```javascript
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send('That article doesn\'t exist!');
    }
});
```
- After testing on postman everything seemed to be working fine,
![image](https://images2.imgbox.com/34/e4/LJtOHuGD_o.png)