const express = require('express')
const db = require('./data/db')


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('its alive')
})

server.get('/hubs', (req, res) => {
    db.hubs
    .find()
    .then(hubs => {
        res.json(hubs)
    })
    .catch(err => {
        res.json({error: error, message: 'something broke' })
    })

})



server.post('/hubs', (req, res) => {
    const hubInformation = req.body;
    db.hubs
    .add(hubInformation)
    .then(hub => {res.status(201).json(hub)})
    .catch(err => {
        res.json({error: error, message: 'error with post request'})
    })
})

server.delete('/hubs/:id', (req, res) => {

    const hubId = req.params.id

    db.hubs
    .remove(hubId)
    .then(deleted => {
        res.status(200).json(deleted)
    }).catch(err => {
        res.json({error: error, message: 'error with post deleting'})
    })
})

server.listen(5000, () => {
    console.log('server is up and running on port 5000')
})
