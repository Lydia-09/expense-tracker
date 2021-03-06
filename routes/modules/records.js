const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

// Create page (new item page)
router.get('/new', (req, res) => {
    let today = new Date()
    today = moment(today).format('YYYY-MM-DD')
    Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => res.render('new', { categories, today }))
})

// Create function
router.post('/', (req, res) => {
    const userId = req.user._id
    const record = req.body
    record.userId = userId
    // console.log(record)
    return Record.create(record)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//Detail page
router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .populate('categoryId')
        .lean()
        .then(record => {
            record.date = moment(record.date).format('YYYY/MM/DD')
            record.amount = record.amount.toLocaleString('en-US')
            res.render('detail', { record })
        })
        .catch(error => console.log(error))
})

//Update page (edit item page)
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .populate('categoryId')
        .lean()
        .then(record => {
            record.date = moment(record.date).format('YYYY-MM-DD')
            Category.find()
                .lean()
                .then(categories => {
                    categories.forEach(category => {
                        if (category._id.equals(record.categoryId._id)) {
                            category.isSelected = true
                        } else {
                            category.isSelected = false
                        }

                    })
                    return res.render('edit', { record, categories })
                })
        })
        .catch(error => console.log(error))
})

//Update function
router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Category.find()
        .lean()
        .then(categories => {
            categories.forEach(category => {
                //?????? record ??? categoryId ?????? category ??????????????? id ??????
                if(category.name === req.body.category) req.body.categoryId = category._id
            })
            Record.findOne({ _id, userId })
                .then(record => {
                    //?????? record ???????????? req.body ?????????????????????????????????????????????
                    record = Object.assign(record, req.body)
                    return record.save()
                })
                .then(() => res.redirect(`/records/${_id}`))
                .catch(error => console.log(error))
    })
})

//Delete function
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router