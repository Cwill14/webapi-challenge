require('dotenv').config();
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

const chores= require('./cDb.js');
const people = require('./pDb.js');

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

server.get('/chores', (req, res) => {
    res.status(200).json(chores)
});

server.post('/chores', (req, res) => {
    
});

server.get('/chores/:id', (req, res) => {

}); 

server.put('/chores/:id', (req, res) => {
    
});

server.delete('/chores/:id', (req, res) => {
    
});

server.get('/people', (req, res) => {
    res.status(200).json(people)
});

server.get('/people/:id', (req, res) => {
    
});

server.get('/people/:id/chores', (req, res) => {
    
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n-- server running on port ${port} --\n`);
})