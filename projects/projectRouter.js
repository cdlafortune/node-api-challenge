const express = require("express");
const validateProject = require("../middleware/validateProject");
const validateAction = require("../middleware/validateAction");
const validateProjectID = require("../middleware/validateProjectID");
const db = require("./projectModel");
const actions = require("./actionModel");
const router = express.Router();

//get all projects
router.get("/projects", (req, res) => {
  db.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

//get project by ID
router.get("/projects/:id", validateProjectID(), (req, res) => {
  db.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//get project's actions
router.get("/projects/:id/actions", validateProjectID(), (req, res) => {
  db.getProjectActions(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Actions not found." });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//get action by ID 
router.get('/projects/:projectID/actions/:id', validateProjectID(), (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            next(err)
        })
});

//create new project
router.post("/projects", validateProject(), (req, res) => {
  db.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      next(error);
    });
});

//create new actions
router.post("/projects/:id/actions", validateProjectID(), validateAction(), (req, res) => {
    actions
      .insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((error) => {
        next(error);
      });
  }
);

//update project
router.put("/projects/:id", validateProject(), (req, res) => {
  db.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(500).json({ message: "Error updating project." });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//update actions
router.put('/projects/:projectID/actions/:id', validateProjectID(), validateAction(), (req, res) => {
    actions.update(req.params.id, req.body)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            next(err)
        })
});

//delete project
router.delete("/projects/:id", (req, res) => {
  db.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete an action 
router.delete('/projects/:projectID/actions/:id', validateProjectID(), (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            if (action) {
                actions.remove(req.params.id)
                    .then(deleted => res.status(200).json({message: "Action deleted."}))
                    .catch(err => res.status(400).json({message: "Error deleting action."}))
                }         
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: "Action not found."});
        })
    

})

module.exports = router;
