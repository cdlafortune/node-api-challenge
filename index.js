const e = require('dotenv').config();
const express = require("express");
const server = express();
const port = process.env.PORT || 5000;
const projects = require("./projects/projectRouter");

server.use(express.json());
server.use(projects);

server.get('/', (req, res) => {
    res.send("<h1>Node sprint challenge</h1>");
});

server.listen(port, () => {
    console.log(`Server listening on port:${port}`);
});