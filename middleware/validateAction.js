module.exports = () => {
    return (req, res, next) => {
        if (!req.body.project_id) {
            res.status(400).json({message: "Invalid project id."})
        } else if (!req.body.description) {
            res.status(400).json({message: "Please enter a description."})
        } else if (!req.body.notes) {
            res.status(400).json({message: "Please enter notes."})
        } else {
            next();
        }
    }
};