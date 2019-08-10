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

function validateChore(req, res, next) {
    // if (req.body.description || req.body.assignedTo) {
    if (req.body.description) {
        if (!req.body.completed) {
            req.body.completed = false;
        }
        if (people.map(person => person.id).includes(req.body.assignedTo)) {
            next();
        } else {
            res.status(400).json({ error: "no person with given id exists" })
        }
    } else {
        // res.status(400).json({ error: "please provide a description text and an assignedTo number"})
        res.status(400).json({ error: "please provide description"})
    }
}

function validatePutChoreId(req, res, next) {
    const { id } = req.params;
    if (id) {
        if (req.body.id) {
            next();
        }
        else {
            req.body.id = Number(id);
            next();
        }
    } else {
        res.status(404).json({ error: "no chore with given id exists" })
    }
}

function incrementId(req, res, next) {
    const url = req.url;
    console.log("url: ", url);
    url.match()
    req.body.id = arr.length + 1;
    next();
}

// server.get('/', (req, res) => {
//     res.status(200).json({ server: "it's working!" })    
// });

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

server.post('/chores', validateChore, (req, res) => {
// server.post('/chores', validateChore, incrementId, (req, res) => {
    // incrementId(chores);
    req.body.id = chores.length + 1;
    chores.push(req.body);
    res.status(201).json(chores);
});

server.get('/chores/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        res.status(200).json(chores[id - 1])
    } else {
        res.status(404).json({ error: "no chore with given id exists" })
    }
}); 

server.put('/chores/:id', validateChore, validatePutChoreId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    chores[id - 1] = changes;
    res.status(200).json(chores);
});

server.delete('/chores/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        chores.splice(id - 1);
        res.status(200).json(chores);
    } else {
        res.status(404).json({ error: "no chore with given id exists" })
    }
});

server.get('/people', (req, res) => {
    res.status(200).json(people)
});

server.get('/people/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        res.status(200).json(people[id - 1])
    } else {
        res.status(404).json({ error: "no person with given id exists" }) 
    }
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

server.post('/people', (req, res) => {
// server.post('/people', incrementId, (req, res) => {

    // incrementId(people);
    req.body.id = people.length + 1;
    if (req.body.name) {
        people.push(req.body);
        res.status(200).json(people);
    } else {
        res.status(400).json({ error: "please provide name" });
    }
    
});

server.delete('/people/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        people.splice(id - 1);
        res.status(200).json(people);
    } else {
        res.status(404).json({ error: "no person with given id exists" })
    }
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n-- server running on port ${port} --\n`);
})