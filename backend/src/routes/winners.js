
const express = require('express');
const router = express.Router()

const getWinners = require('../scripts/fbScripts').getWinners

const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {

    let winners = await getWinners(HAMSTERS)

    res.send(winners)
})



module.exports = router