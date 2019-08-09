const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const peopleRouter = require('./peopleRouter.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

server.use('/people', peopleRouter);
server.get('/', (req, res) => {
    res.status(200).json({
        Dustin: "it's working!"
    })
});

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};

module.exports = server;