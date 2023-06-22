const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!bennnnn')
})
app.get('/about', (req, res) => {
    res.send('i am Ben')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})