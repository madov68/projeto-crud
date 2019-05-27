const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
//const mysql = require('mysql')
const bodyParser = require('body-parser')
const connection = require('knex')({
    client:'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'cadastro' 


    } 
})

const dependencies = {
    connection
}

const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))
app.use('/pessoas', pessoas(dependencies))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/*
connection.connect(() => {
    app.listen(port, () => console.log('CRUD iniciado na porta '+port))
})
*/

app.listen(port, () => console.log('CRUD iniciado na porta '+port))