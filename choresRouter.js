const router = require('express').Router();

const people = require('./pDb.js');
const chores = require('./cDb.js');

// router.get('/', (req, res) => {
//     res.status(200).json(chores);    
// });

router.get('/'), (req, res) => {
    let { completed } = req.query;
    // const completed = req.query.completed;
    // console.log(completed);
    // if (completed === true) {
        // res.status(200).json(chores.filter(chore => {
        //     chore.completed === true
        // }))
    // } else if (completed === false) {
    //     res.status(200).json(chores.filter(chore => {
    //         chore.completed === false
    //     }))
    // }
    console.log(completed);
    if (completed) {
        const filter = completed == true ? true : false
        const result = chores.filter(chore => chore.completed == filter)
        res.status(200).json(result)
    } else {
        res.status(200).json(chores);
    }
}


router.post('/', autoIncrementId, (req, res) => {
    let choreBody = req.body;
    chores.push(choreBody)
    res.status(201).json(chores)
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    chores.splice(id - 1);
    res.status(200).json(chores);
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    chores[id - 1] = changes;
    res.status(200).json(chores);
})

function autoIncrementId(req, res, next) {
    req.body.id = chores.length + 1;
    next();
}



module.exports = router;