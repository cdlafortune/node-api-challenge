const db = require('../projects/projectModel')

module.exports = () => {
    return (req, res, next) => {
        db.get(req.params.id)
            .then((project) => {
                if (project) {
                    next();
                } else {
                    res.status(404).json({message: "Project not found."})
                }
            })
            .catch(next)
    }
};