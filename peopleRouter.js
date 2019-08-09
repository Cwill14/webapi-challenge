const router = require('express').Router();

const people = require('./pDb.js');
const chores = require('./cDb.js');


router.get('/:id'/chores, (req, res) => {
    const pId = req.params.id;
//     let aID = chores.assignedTo;
//     chores[id === assignedTo]; 

//     if (pId) {
//         if (aID) {
//             res.status(200)
//         } else {
//             res.status(200).json([]);
//         }
//     } else {
//         res.status(404).json({ error: "no person with given Id exists in database" })
//     }
});

router.get('/', (req, res) => {
    res.status(200).json(people)
})

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
