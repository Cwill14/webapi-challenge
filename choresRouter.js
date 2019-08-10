const router = require('express').Router();

const people = require('./pDb.js');
const chores = require('./cDb.js');

router.get('/', (req, res) => {
    let { completed } = req.query;
    if (completed) {
        const result = chores.filter(chore => chore.completed.toString() === completed)
        res.status(200).json(result)
    } else {
        res.status(200).json(chores);
    }
})

router.post('/', autoIncrementId, validateChore, (req, res) => {
    let choreBody = req.body;
    chores.push(choreBody)
    res.status(201).json(chores)
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    chores.splice(id - 1);
    res.status(200).json(chores);
});

router.put('/:id', validateChore, (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    chores[id - 1] = changes;
    res.status(200).json(chores);
})

function autoIncrementId(req, res, next) {
    req.body.id = chores.length + 1;
    next();
}

function validateChore(req, res, next){
    let aIdNum = Number(req.body.assignedTo);
    if (req.body) {
        if (req.body.description && req.body.assignedTo) {
            if (req.body.assignedTo && people.map(person => person.id).includes(aIdNum)){
                next();
            } else {
                res.status(400).json({ error: "No person exists with given assignedTo value as id" })
            }
        } else {
            res.status(400).json({ error: "assignedTo or description missing" })
        }
    } else {
        res.status(400).json({ message: "missing user data" })
    }
}

module.exports = router;