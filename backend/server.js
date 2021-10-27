const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 1337

// Middleware - TODO
// Exempel: static folders, logger, CORS
app.use(cors())
app.use( express.static(__dirname + '/../build') )

// Endpoints
// app.use om vi har en separat router-fil
// app.get('/', (req, res) => {
// 	console.log('Server received GET request /');
// 	res.status(200).send('Server is online')
// })
const animalsData = ['Hund', 'Katt', 'Grävling', 'Orm', 'Älg']
app.get('/animals', (req, res) => {
	res.send(animalsData)
})

// Behövs om man använder React Router
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/build/index.html')
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
