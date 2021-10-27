const express = require('express');
const router = express.Router()

const getLosers = require('../scripts/fbScripts').getLosers

const HAMSTERS = 'hamsters'


router.get('/', async (req, res) => {

    let losers = await getLosers(HAMSTERS)

    res.send(losers)
})





module.exports = router