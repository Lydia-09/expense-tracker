const bcrypt = require("bcryptjs")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const userList = require('./user.json').userSeed
const recordList = require('./record.json').recordSeed

// Generate user & record seeds
db.once('open', () => {
  const userPromise = []
  userList.forEach( function(seedUser) {
    userPromise.push(
      User.findOne({ email: seedUser.email })
        .then(user => {
          if(user) {
            console.log(`User seed data ${seedUser.email} already exists.`)
            return user
          } else {
            console.log(`Start creating User seed data: ${seedUser.email}...`)
              return bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(seedUser.password, salt))
                .then(hash => User.create({
                  name: seedUser.name,
                  email: seedUser.email,
                  password: hash
                }))    
          }
        })
        .then(user => {
          const recordLists = recordList.filter( function(record) {
            return record.userName === user.name
          })
          const recordPromise = []
          recordLists.forEach( function(record) {
            record.userId = user._id
            recordPromise.push(
              Category.findOne({ title: record.category })
                .then(category => {
                  if (category) {
                    record.categoryId = category._id
                    return Record.create(record)
                  }
                })
            )
          })
          return Promise.all(recordPromise)
        })
    )
  })
  Promise.all(userPromise)
    .then(() => {
      console.log('record seed data create done!')
      console.log('database connection close.')
      process.exit()
    })
})

// db.once('open', () => {
//   new Promise((resolve, _reject) => {
//     Category.find()
//       .then(categories => {
//         console.log('categroy created......')
//         const categoriesId = []
//         categories.forEach(category => {
//           categoriesId.push(category._id)
//         })
//         return categoriesId // 含有所有類別 _id 的 array
//       }).then(id => {
//         const seedRecoder = []
//         for (let i = 0; i < 5; i++) {
//           let recoder = {
//             name: `name-${i}`,
//             categoryId: id[i],
//             date: `2022-04-0${i + 1}`,
//             amount: (i + 1) * 100
//           }
//           seedRecoder.push(recoder)
//         }
//         return Record.create(seedRecoder)
//       }).then(() => {
//         console.log('Record seeder build complete! ^_^')
//         resolve()
//       })
//     }).then(() => {
//       console.log('database connection close.')
//       process.exit()
//     }).catch(error => {
//       console.log(error)
//     })
// })

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