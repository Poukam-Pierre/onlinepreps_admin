//  Made by Poukam Ngamaleu

const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

// Database informations
const db = mysql.createPool({
    host:'sql5.freemysqlhosting.net',
    user:'sql5508471',
    password:'xTKfRSifHv',
    database:'sql5508471'
})

// install a middleware package
app.use(express.json())
app.use(express.urlencoded({extend: true}))
app.use(cors())

// Do mysql request
app.post('/api/insert', (req, res)=> {

    const phoneNumber = req.body.phoneNumber

    const sqlInsert = "INSERT INTO prepsfollowers(prepsfollowers_number) VALUES (?)"
    db.query(sqlInsert, [phoneNumber], (err, result) => {
         console.log(result)
    })
})

// where you cans find API  
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})