const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// 引用 mongoose 連線設定檔
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send('hello world')
})

const port = 3000

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})