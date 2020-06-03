const express = require('express');


const server = express();


//custom middleware







server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});




module.exports = server;
