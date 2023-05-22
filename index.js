const express = require('express');
const cors = require('cors');
const app= express()
const port = process.env.PORT || 5000


require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('It Project Run in Browser')
})

app.listen(port, ()=>{
    console.log('it project run in cmd')
})