import express from 'express';

import { db, connectToDB } from './db.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello!`);
})

app.get('/userpage/allposts/:id', async (req, res) => {
    const { id }= req.params;
   const article = await db.collection('revise').findOne({ id });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});
// Route for posting contents.
app.get('/userpage/allposts', async (req, res) => {
    try {
        const articles = await db.collection('revise').find().toArray();
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
    });

// Route for displaying the posts.

app.post('/userpage/post', async (req, res) => {
try {

    const { text, comments,like } = req.body;
    const articles = await db.collection('revise').insertOne({text, comments, like });
    res.json(articles);
} catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
}
});


  
connectToDB(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})