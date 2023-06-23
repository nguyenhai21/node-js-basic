// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config();

const app = express()
const port = process.env.PORT||3000;// ||3000 backup
console.log(`>>>check port:`,port)//kiểm tra cổng port

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