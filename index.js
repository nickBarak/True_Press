const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const port = process.env.PORT || 3000;
const { parse } = require('url');

/* Redirect HTTP to HTTPS */
app.prepare().then(_=> {
    const server = express();
    server.enable('trust proxy');
    
    server.use( (req, res) => {
        if (req.secure || dev) { handle(req, res, parse(req.url, true)) }
        else return res.redirect('https://www.mocknexus.com');
    });

    server.listen(port, _=> console.log('Listening on port', port))
});