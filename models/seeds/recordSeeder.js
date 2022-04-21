if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Category = require('../category')
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  new Promise((resolve, _reject) => {
    Category.find()
      .then(categories => {
        console.log('categroy created......')
        const categoriesId = []
        categories.forEach(category => {
          categoriesId.push(category._id)
        })
        return categoriesId // 含有所有類別 _id 的 array
      }).then(id => {
        const seedRecoder = []
        for (let i = 0; i < 5; i++) {
          let recoder = {
            name: `name-${i}`,
            categoryId: id[i],
            date: `2022-04-0${i + 1}`,
            amount: (i + 1) * 100
          }
          seedRecoder.push(recoder)
        }
        return Record.create(seedRecoder)
      }).then(() => {
        console.log('Record seeder build complete! ^_^')
        resolve()
      })
    }).then(() => {
      console.log('database connection close.')
      process.exit()
    }).catch(error => {
      console.log(error)
    })
})

// db.once('open', () => {
//   console.log('Start creating Record seed data...')
//   createRecords()
//   console.log('Record seeder build complete! ^_^')
//   console.log('database connection close.')
// })

// function createRecords() {
//   Category.find()
//     .then(categories => {
//       const categoriesId = []
//       categories.forEach(category => {
//         categoriesId.push(category._id)
//       })
//       return categoriesId // 含有所有類別 _id 的 array
//     })
//     .then(id => {
//       for (let i = 0; i < 5; i++) {
//         Record.create({ // 新增紀錄
//           name: `name-${i}`,
//           categoryId: id[i],
//           date: `2022-09-0${i + 1}`,
//           amount: (i + 1) * 100
//         })
//       }
//     })
//     .catch(error => console.error(error))
// }
