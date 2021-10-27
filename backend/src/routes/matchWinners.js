
const express = require('express');
const router = express.Router()

const getMatchWinners = require('../scripts/fbScripts').getMatchWinners

const HAMSTERS = 'hamsters'
const MATCHES = 'matches'

router.get('/:id', async(req, res) => {
    
    let matchWinners = await getMatchWinners(MATCHES, HAMSTERS, req.params.id)
    
    if(matchWinners == false) {
            res.sendStatus(404)
            return
        }
    
        res.send(matchWinners)
})


module.exports = router