const express = require('express');

const server = express();

server.use(express.json())

//Routes
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")


//custom middleware logger function 
const logger = (req, res, next) => {
   const newtime = new Date()
  console.log(`
  Method: ${req.method} 
  URL: ${req.originalUrl}
  Timestamp: ${newtime}`);
  next();
}


server.use("/api/users", logger, userRouter)
server.use("/api/posts", logger, postRouter)





server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});




module.exports = server;
