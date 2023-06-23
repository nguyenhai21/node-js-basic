// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
const app = express()
const port = 3000

// sendFile will go here
configViewEngine(app);
app.get('/', function(req, res) {
  res.render('test/index.ejs')
})
app.get('/about', (req, res) => {
    res.send('i am Ben')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})