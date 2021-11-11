const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');

const PORT = process.env.PORT || 1337

const hamstersRoute = require('./src/routes/hamsterRoute')
const matchesRoute = require('./src/routes/matchesRoute')
const winners = require('./src/routes/winners')
const losers = require('./src/routes/losers')
const matchWinners = require('./src/routes/matchWinners')


// Middleware - TODO
// Exempel: static folders, logger, CORS
app.use( express.urlencoded({ extended: true }) )
app.use(cors())
app.use( express.json() )
app.use('/', express.static(__dirname + '/../build'))
//app.use(express.static(__dirname + '../public'))



app.use((req,res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
})

// Endpoints

app.use( '/hamsters', hamstersRoute )
app.use( '/matches', matchesRoute )
app.use( '/winners', winners )
app.use( '/losers', losers ) 
app.use( '/matchWinners', matchWinners )
// app.use om vi har en separat router-fil

// app.get('/', (req, res) => {
// 	console.log('Server received GET request /');
// 	res.status(200).send('Server is online')
// })


// Behövs om man använder React Router
app.get('*', (req, res) => {
	//res.sendFile(__dirname + '/build/index.html')
    res.sendFile(__dirname + '/build/index.html') 
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
