// const express = require('express')
import express from 'express'

const app = express()
const hostname = 'localhost'
const port = 8017


app.get('/', function (req, res) {
  res.send(`<h1>helooo Nodejs. I'm Minatisleeping</h1>`)
})

app.listen(port, hostname, () => {
    console.log(`Helloo MinatDev, I'm running server at http://${hostname}:${port}/`)
})