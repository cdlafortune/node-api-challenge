const e = require("express")

module.exports = () => {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({message: "Please provide a name."})
        } else if (!req.body.description) {
            return res.status(400).json({message: "Please provide a description."})
        } else {
            next();
        }
    }
};