## The fullstack project link is, at the end of the page.
# Preparing the app for Release
- After completing the front-end, we Build the app by running the command.
- `npm run build`
- Which Make out app, the browser readable and ready for the deployment, 
- The front-end part is ready, now we will work on the Bakcend part.
- The build folder of the front-end is moved into out backend folder for further process.
## Have our node server serve the build files.
- First we tell expess to use that build folder as static folder.
- The command is given below,
```javascript
app.use(express.static(path.join(__dirname,'../build')));
```
- Also the make this type module work, we added some more arguments in our `server.js` file,
```javascript
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
- Next , I made an error handler that woks the route doesnot exist,
- This handles error for all the routes that doesnot start with api.
- I promise this is very cool code, :)
```javascript
app.get(/^(?!\/api).+/, (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})
```
- Now we can run our `React App` by requesting to our server, without ruunig the front-end part,
- We opened the app by typing `localhost:8000` as we have setted this before,
- Now we, created and const `PORT` which helps the hosting platform the add whatever suitable port number to our project and as we are running now, we set 8000 as a default value,
```javascript
const PORT = process.env.PORT || 8000;
connectToDB(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
})
```

# Setting up MongoDB
- This is very fun, 
- As I have previously install mongoDB and its shell, 
- We have to host the database remotly, so to do this, search for mongoDB atlas, it is very free and easy to use, 
- Once after login and redirected to the mongoDB dashbord, we need to create an new project,
- I have created project named, Full-Stack Blog Site,
- Then after setting username and password we added that into our project by created an env varaible,
- I have created .env file and pasted the USERNAME AND PASSWORD, into that file,
- So. inorder to automatically load the  environment variable from the `.env` file I installed the `dotenv` package by running the command,
- `npm install dotenv`
- The we imported by typing `import 'dotenv/config'`
### Instead of connecting the local database, we now connect the cloud database.
- We do this by going back to the mongoDB altas website and, doing afew thing
- Then presseing connect, choosing the first option as ALLOW ACCESS FROM ANYWHERE
- And then, WE choose connect the App from the bunch of option, then we copied the code, 
- Then we added that code changing the mongoDB username and password , I placed the code in the proviously set local MongoDB database,
```javascript
import { MongoClient } from 'mongodb'; 
let db;
async function connectToDB(cb){
    const client= new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.8jhke3c.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('reac-blog-bd');
    cb();
}
export{
    db,
    connectToDB,
}

```
- Then we configured database, in the cloud mongoDB, 
- First we select connect with mongoDB shell by heading towards the mongoDB atlas, 
- Then there is the shell script which connect our terminal to the mongo DB database,
- We entered that code into our terminal, add the database, that we need, by typing the command,
- `use react-blog-db`
- For reference [[Day-10_Learning-React|More about mongoDB]]
- `db.articles.insertmany([{ name:'learn-react, upvotes:0, comments:[]'}])` This is an example so I added only one elements, in the actual DB there are are elements
- Then we exited the Mongo Shell, 
- Then we take a look at our now, we are able to upvote the article,
- Everything seems to work fine.
# Releasing a full-stack application.
- We are going to release our project into the google cloud so firest created an `app.yaml` file used by the Google App Engine platform to specify how the platform should run your application.
- Then we added `runtime: nodejs19` into that app.yaml file,
- Then we also creat another yaml file names `prod-env.yaml` which includes the MONGOGB username and password, we created seperate file, because if we ever want to have two environment variables for production and development, these file can be used.
- Then we imported the `prod-env.yaml` file into the main `app.yaml` file.
> Give our app a start script,
- Inside the `package.json` we added `start: "node src/server.js"` This start script is what google cloud will use to start our app once we uploaded all of our files and built the enviroment.
- Late thning we need to do is, head towards to `console.cloud.google.com` and search for the firebase project that I have previously created,
- Now, I have to Install the google cloud CLI.
- After installing gcolud install, I checked it by running `gcloud --version`
- Then we type the command `gcloud auth login`
- Then, we copied the project id, by going to the google cloud console website and by slecting my project there is the project id,  
- Then we run the command `gcloud config set project (projectid)`
- Then I tried to deploy my project by running the command 
- `gcloud app deploy` , this will ask for the region and it uplodes all of the files to google cloud, 
- And one thing to consider, we get error and this error is because we need to add a billing info, and enable biliing for the feature, of Cloud Build API.
- After adding my billing info, hopefully I have my payonner mastercard, which saves my day, 
- This time the apps was  deployed successfully without an error, and it gave us the link in which it can be accessable.
- The billing can be removed as we dont to host our app to google cloud.
# So this was it, the overall development and hosting of an fullstack- react application
## This link for the app  is : https://learn-reactjs-bed3a.df.r.appspot.com/articles/mongodb
###  Please go ahead and add an nice comment that you actually read till last and try to understand what I learned during this period. 