#!/usr/bin/env node
const express = require('express')
const app = express()
const cors = require('cors')
const {log} = console

// NEW HTTPS
const fs = require('fs')
// If I want I can have multiple ssl certificates for different sites as well. src: https://stackoverflow.com/a/54254880/10012446
const server = require('https').createServer(
	{
		key: fs.readFileSync('/etc/letsencrypt/live/www.fixedlife.ml/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/www.fixedlife.ml/fullchain.pem'),
	},
	app
)

// const PORT = 8080
// const PORT = 80
const PORT = 443 // this for https protocol

app.disable('x-powered-by') // This is to disable x-powered-by header which is only useful if you are using 'helmet', and you must disable this header as the target hackers can launch application specific hacks on your server🤑︎.

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
	log(`${req.method} @ ${req.path}`)

	next()
})

app.get('/', (req, res) => {
	return res.send("You made a get request on '/' endpoint.")
})

app.get('/a', (req, res) => {
	return res.status(201).send("You made 'get' request on '/a' endpoint.")
})

app.get('/b', (req, res) => {
	log(req.body)

	return res.send(req.body) // You don't need res.json to serialize js object to json, express does this on its own🤺︎.
})

// app.listen(PORT, function () {
server.listen(PORT, function () {
	console.log('express running on', PORT, '...')
})
