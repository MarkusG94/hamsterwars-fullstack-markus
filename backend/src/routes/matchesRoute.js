
const express = require('express');
const router = express.Router()


const { getAll, getOne, addOne, deleteOne } = require('../scripts/fbScripts')
const isMatch = require('../validators/validate').isMatch

const MATCHES = 'matches'



router.get('/', async (req, res) => {
    let getMatches = await getAll(MATCHES)
res.send(getMatches)

})


router.get('/:id', async (req, res) => {
    let maybeMatch = await getOne(req.params.id, MATCHES)

    if (!maybeMatch.exists) {
        res.sendStatus(404)
    }
    const match = await maybeMatch.data()
       
    res.send(match)
})

router.post('/', async(req, res) => {
    if (!isMatch(req.body)) {
        res.status(400).send('Bad hamster object')
        return
    }
    let newMatch = await addOne(MATCHES, req.body)
    res.status(200).send(newMatch)
})

router.delete('/:id', async(req,res) => {
    const deleteMatch = await deleteOne(req.params.id, MATCHES)
    if (deleteMatch) {
        res.sendStatus(200)
        return
    } else {
        res.sendStatus(404)

    }
})

module.exports = router