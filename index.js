require('dotenv').config();
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n-- server running on port ${port} --\n`);
})