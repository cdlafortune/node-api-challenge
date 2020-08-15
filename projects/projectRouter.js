const express = require("express");
const validateProject = require('../middleware/validateProject');
const db = require("./projectModel");
const e = require("express");
const router = express.Router();

//get all projects
router.get('/projects', (req, res) => {
    db.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            res.status(200).json(err)
        })
});

//get project by ID
router.get('/projects/:id', (req, res) => {
    db.get(req.params.id)
        .then((project) => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(400).json({message: "Invalid id."})
            }
        })
        .catch((err) => {
            res.status(404).json(err)
        })
});

//get project's actions
router.get('/projects/:id/actions', (req, res) => {
    db.getProjectActions(req.params.id)
        .then((actions) => {
            if(actions){
                res.status(200).json(actions)
            } else {
                res.status(404).json({message: "Actions not found."})
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});

//create new project
router.post('/projects', validateProject(), (req, res) => {
    db.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            next(error)
        })
});

//update project
router.put('/projects/:id', validateProject(), (req, res) => {
    db.update(req.params.id, req.body)
        .then((project) => {
            if (project){
                res.status(200).json(project)
            }
            else {
                res.status(500).json({message: "Error updating project."})
            }
        })
        .catch((err) => {
            next(err)
        })
});

//delete project
router.delete('/projects/:id', (req, res) => {
    db.remove(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});

module.exports = router;