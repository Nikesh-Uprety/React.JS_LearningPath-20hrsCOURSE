const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/page2', (req, res) => {
            return app.render(req, res, '/page2');
        })

        server.get('/page3', (req, res) => {
            return app.render(req, res, '/ohyeah');
        })

        server.get('*', (req, res) => {
            return handle(req, res);
        })

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${port}`);
    })
})