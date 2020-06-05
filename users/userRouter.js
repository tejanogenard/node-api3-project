const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => { // working 
  users.insert(req.body)
    .then(user => {
      res.status(201).json( {user} )
    })
    .catch( err => {
      res.status(500).json({ error: "error saving user to the database", err})
    })
});

router.post('/:id/posts', validatePost, validateUserId,  (req, res) => { //working!
  const {id} = req.params

  posts.insert({...body, user_id: id })
  .then( post => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "The Post could not be saved." })
  })

});

router.get('/', (req, res) => { // working
  users.get()
  .then( user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "There was a problem accessing the users."})
  })
});

router.get('/:id', validateUserId, (req, res) => { // working
  users.getById(req.params.id)
  .then((user => {
    res.status(200).json(user)
  }))
  .catch(err => {
    res.status(500).json({ error: "cannot find user"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => { // working 
  users.getUserPosts(req.params.id)
  .then( post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({error: "Internal Server error getting post "})
  })
});

router.delete('/:id',  (req, res) => { // working!
  const { id } = req.params
  users.remove(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({error: "error deleting user"})
  })
});

router.put('/:id', (req, res) => { // Working! 
  const { id } = req.params
  const body = req.body
  users.update(id, body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal Server error while deleting user` }))
});

//custom middleware

//
function validateUserId(req, res, next) {
  if (req.params.id) {
    users.getById(req.params.id)
      .then(user => {
        if (user) {
          user = req.user
          next()
        } else {
          res.status(404).json({
            message: "invalid user id"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Internal Server error finding user",
          err
        })
      })
  }
}

function validateUser(req, res, next) {
  console.log(req.body)
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

module.exports = router;
