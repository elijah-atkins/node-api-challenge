const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get("/", (req, res) => {
    // console.log(req.query);
    Projects.get()
      .then((project) => {
        // note the "200" response... 2xx responses are "success" responses.
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(500).json({
          error: "The project information could not be retrieved.",
        });
      });
  });

  router.get("/:id", (req, res) => {
    // do your magic!
    const { id } = req.params;
    Projects.get(id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(500).json({
          error: "The project information could not be retrieved.",
        });
      });
  });



//custom middleware


  
  function validateProject(req, res, next) {
      const body = req.body;
      const { name } = req.body;
      if (!body || Object.entries(body).length === 0) {
        res.status(400).json({ message: "missing project data" })
      }
      if(!name || name === []){
        res.status(400).json({ message: "missing required name field" })
      }
        next();
  }
  
  function validatePost(req, res, next) {
    if(!req.body){
      res.status(400).json({
        message: "missing post data",
      });
    } else {
      const { text } = req.body
      if(!text){
        res.status(400).json({
          message: "missing required text field",
        });
      }
    }
  
    next();
  }
  
  module.exports = router;
  