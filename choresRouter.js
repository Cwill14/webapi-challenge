const router = require('express').Router();

const chores = require('./cDb.js');


router.get('/', (req, res) => {
    console.log(chores);
    // chores.get()
    //     .then(chores => {
    //         res.status(200).json(chores)
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: "problem getting chores" })
    //     })
    res.status(200).json(chores);
});
router.post('/', autoIncrementIds, (req, res) => {
    let choreBody = req.body;
    // people.post(choreBody)
    //     .then(chore => {
    //         res.status(201).json({ "added chore": choreBody })
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: "problem posting chore" })
    //     })
    chores.push(choreBody)
    res.status(201).json(chores)
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // people.delete(id)
    //     .then(result => {
    //         console.log(result);
    //         res.status(200).json({ "Successfully deleted chore by id": id})
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: `problem deleting chore by id ${id}` })
    //     })
    chores.splice(id - 1);
    res.status(200).json(chores);
});
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    // people.put(id, changes)
    //     .then(chore => {
    //         console.log(chore);
    //         res.status(200).json({ "updated chore": changes })
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: `problem updating chore by id ${id}` })
    //     })
    chores[id - 1] = changes
    res.status(200).json(chores);
})

function autoIncrementIds(req, res, next) {
    req.body.id = chores.length + 1;
    next();
}

module.exports = router;