if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require ('../category')
const db = require ('../../config/mongoose')

const categories = [
  ['家居物業', 'fa-home'],
  ['交通出行', 'fa-shuttle-van'],
  ['休閒娛樂', 'fa-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他', 'fa-pen']
].map(category => ({
  title: category[0],
  icon: `<i class="fas ${category[1]}"></i>`
}))

// Generate category seed
db.once('open', () => {
  new Promise((resolve, _reject) => {
    console.log('Start creating Category seed data...')
    Category.create(
      categories
    ).then(() => {
      console.log('Category seeder build complete! ^_^')
      resolve()
    })  
  }).then(() => {
    console.log('database connection close.')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})