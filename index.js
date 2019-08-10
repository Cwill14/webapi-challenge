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
    // let completed = req.query;
    // console.log(completed);
    let { completed } = req.query;
    if (completed) {
        // res.status(200).json(chores.filter(chore => chore.completed == completed))
        res.status(200).json(chores.filter(chore => chore.completed.toString() === completed))

    } else {
        res.status(200).json(chores)
    }
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
    const { id } = req.params;
    // console.log(people.map(person => person.id));
    // console.log(people.map(person => Number(person.id)));
    console.log(people.map(person => Number(person.id)).includes(Number(id)));
    // console.log(id);
    // console.log(Number(id));
    // if (people.includes(people.map(person => person.id))) {
    if (people.map(person => Number(person.id)).includes(Number(id))) {
    // if (id) {
        // if (id ===) {

        // }
        res.status(200).json(chores.filter(chore => chore.assignedTo == id))
    } else {
        res.status(404).json({ error: "no person with given id exists" })        
    }
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n-- server running on port ${port} --\n`);
})