const express = require("express");

const Projects = require("../data/helpers/projectModel");

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
router.get("/:id/actions", (req, res) => {
    // do your magic!
    const { id } = req.params;
    Projects.getProjectActions(id)
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((error) => {
        res.status(500).json({
          error: "The project action information could not be retrieved.",
        });
      });
  });

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error while saving the project to the database",
      });
    });
});

router.put("/:id", validateProject, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Projects.update(id, changes).then((project) => {
    if (project) {
      res.status(201).json(changes);
    } else {
      res.status(500).json({
        message: "The project could not be saved to the database",
      });
    }
  });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(count => {
        res.status(200).json({ message: 'The project has been removed' });
    }).catch(err =>{
      res.status(500).json({ message: 'The project could not be found', error: err });
    }
    )
  });

//custom middleware

function validateProject(req, res, next) {
  const body = req.body;
  const { name, description } = req.body;
  if (!body || Object.entries(body).length === 0) {
    res.status(400).json({ message: "missing project data" });
  }
  if (!name || !description || name === [] || description === []) {
    res
      .status(400)
      .json({ message: "missing required name and/or description field" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing post data",
    });
  } else {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({
        message: "missing required text field",
      });
    }
  }

  next();
}

module.exports = router;
