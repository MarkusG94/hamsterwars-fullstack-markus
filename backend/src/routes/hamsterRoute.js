const express = require('express');
const router = express.Router()

const { getAll, getOne, updateOne, deleteOne, addOne, cutestHamsters } = require('../scripts/fbScripts')
const { isHamsterObject, isUpdatedHamster } = require('../validators/validate')

const HAMSTERS = 'hamsters'



// GET all hamsters
router.get('/', async (req, res) => {
    let allHamsters = await getAll(HAMSTERS);
    res.send(allHamsters)
})



// GET one random hamster
router.get('/random', async (req, res) => {
    let hamsterArray = await getAll(HAMSTERS)

    let randomHamster = await hamsterArray[Math.floor(Math.random() * hamsterArray.length)]
    res.status(200).send(randomHamster)
})


router.get('/cutest', async(req, res) => {
    let cuteHamsters = await cutestHamsters(HAMSTERS)
    res.send(cuteHamsters)
})


//GET one hamster by ID
router.get('/:id', async (req, res) => {
    let maybeHamster = await getOne(req.params.id, HAMSTERS)
    if (maybeHamster.exists) {
        const hamster = await maybeHamster.data()
        res.send(hamster)
    } if (!maybeHamster.exists) {
        res.sendStatus(404)

    }

})


router.post('/', async (req, res) => {
    if (!isHamsterObject(req.body)) {
        res.status(400).send('Bad hamster object')
        return
    }
    let hamster = await addOne(HAMSTERS, req.body)
    res.status(200).send(hamster)
})


//Update a hamster by ID
router.put('/:id', async (req, res) => {


    let maybeHamster = await getOne(req.params.id, HAMSTERS)
    
    if (!maybeHamster.exists) {
        res.sendStatus(404)
        return
    }
    if (!isUpdatedHamster(req.body)) {
        res.status(400).send('must send hamster update object.')
        return
    }

    await updateOne(req.params.id, HAMSTERS, req.body)
    res.sendStatus(200)
    return

})




router.delete('/:id', async (req, res) => {


    const delHamster = await deleteOne(req.params.id, HAMSTERS)
    if (delHamster) {
        res.sendStatus(200)
        return
    } else {
        res.sendStatus(404)

    }

})


module.exports = router