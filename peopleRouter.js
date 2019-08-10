const router = require('express').Router();

const people = require('./pDb.js');
const chores = require('./cDb.js');

router.get('/', (req, res) => {
    res.status(200).json(people)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        res.status(200).json(people[id -1])
    } else {
        res.status(404).json({ error: "No person with given ID exists" })
    }
})

router.get('/:id/chores', (req, res) => {
    const pId = req.params.id;
    if (pId) {
        let result = chores.filter(chore => chore.assignedTo == pId)
        res.status(200).json(result)
    } else {
        res.status(404).json({ error: "No person with given ID exists" })
    }
});

function validateName(req, res, next){
    if (req.body) {
        if (req.body.name) {
            next()
        } else {
            res.status(400).json({ message: "missing required name field" })
        }
    } else {
        res.status(400).json({ message: "missing user data" })
    }
}

module.exports = router;
