const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
router.get('/', (req, res) => {
    const userId = req.user._id
    Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
            Record.find({ userId })
                .populate('categoryId')
                .lean()
                .sort({ _id: 'asc' })
                .then(records => {
                    let totalAmount = 0
                    records.forEach(record => {
                        record.date = moment(record.date).format('YYYY/MM/DD')
                        totalAmount += record.amount
                    })
                    return res.render('index', { records, totalAmount, categories})
                })
        })
        .catch(error => console.error(error))
        
})

module.exports = router