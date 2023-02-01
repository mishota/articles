let router = require('express').Router()
let assign = require('object-assign')
let mocks = require('./mock')
let rndm = require('rndm')

let ID_LENGTH = 24

router.get('/articles', function (req, res, next) {
  let articles = mocks.articles.map(function (article) {
    return assign({}, article, {
      text: undefined,
    })
  })

  res.json(articles)
})

router.get('/articles/:id', function (req, res, next) {
  let article = mocks.articles.filter(function (article) {
    return article.id == req.params.id
  })[0]
  if (article) return res.json(article)

  res.status(404).json({ error: 'not found' })
})

router.post('/articles', function (req, res, next) {
  let body = req.body
  let article = {
    text: body.text,
    title: body.title,
    id: rndm(ID_LENGTH),
    user: body.user,
    date: new Date(),
  }
  mocks.articles.push(article)

  res.json(article)
})

router.get('/comments', function (req, res, next) {
  let aid = req.query.article || null
  let comments =
    aid !== null
      ? mocks.comments.filter(function (comment) {
          return comment.article === aid
        })
      : mocks.comments

  res.json(comments)
})

router.post('/comments', function (req, res, next) {
  let comment = {
    id: Date.now(),
    text: req.body.text,
    user: req.body.user,
    article: req.body.article,
  }
  mocks.comments.push(comment)
  res.json(comment)
})

module.exports = router
