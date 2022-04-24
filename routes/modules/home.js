const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
router.get('/', async (req, res) => {
    const userId = req.user._id
    const { categoryId } = req.query
    const categories = await Category.find().lean()
    let records = []
    let totalAmount = 0
    let numberAmount = 0

    if (categoryId) {
        const category = categories.find(category => {
            if (category._id.toString() === categoryId) {
                category.selected = 'selected'
                return category
            }
        })
        records = await Record.find({ userId, categoryId })
            .populate('categoryId')
            .lean()
            .sort({ date: -1 })
    } else {
        records = await Record.find({ userId })
            .populate('categoryId')
            .lean()
            .sort({ date: -1 })
    }

    records.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        totalAmount += Number(record.amount)
        record.amount = record.amount.toLocaleString('en-US')
    })

    numberAmount = totalAmount.toLocaleString('en-US')

    res.render('index', { records, categories, totalAmount, numberAmount})
})

// router.get('/', (req, res) => {
//     const userId = req.user._id
//     Category.find()
//         .lean()
//         .sort({ _id: 'asc' })
//         .then(categories => {
//             Record.find({ userId })
//                 .populate('categoryId')
//                 .lean()
//                 .sort({ _id: 'asc' })
//                 .then(records => {
//                     let totalAmount = 0
//                     records.forEach(record => {
//                         record.date = moment(record.date).format('YYYY/MM/DD')
//                         totalAmount += record.amount
//                     })
//                     return res.render('index', { records, totalAmount, categories})
//                 })
//         })
//         .catch(error => console.error(error))      
// })

module.exports = router