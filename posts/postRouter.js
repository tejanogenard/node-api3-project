const express = require('express');

const posts = require("./postDb.js")
const router = express.Router();

router.get('/', (req, res) => { //working 
  posts.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => res.status(500).json({
      error: "Internal Server error getting posts"
    }))
});

router.get('/:id', validatePostId, (req, res) => {
  posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
        .catch(err => res.status(500).json({
          error: "Internal Server error getting post"
        }))
    })

});

router.delete('/:id', validatePostId, (req, res) => {
  posts.remove(req.param.id)
    .then(post => {
      res.status(200).json({
        message: "post has been deleted"
      })
    })
    .catch(err => res.status(404)).json({
      error: "error when deleting ",
      err
    })
});

router.put('/:id', validatePostId, (req, res) => {
  posts().update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        error: "error when updating post."
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(400).json({
          error: "Invalid post id"
        })
      } else {
        req.post = post
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Error validating post id"
      })
    })
}

module.exports = router;
