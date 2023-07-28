// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
// import connection from './configs/connectDB';
import initAPIRoute from './route/api';

require('dotenv').config();
var morgan = require('morgan')


const app = express()
const port = process.env.PORT||3000;// ||3000 backup
console.log(`>>>check port:`,port)//kiểm tra cổng port

app.use((req, res, next) => {
  //check => return res.send()
  console.log('>>> run into my middleware')
  console.log(req.method)
  next();
})

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})