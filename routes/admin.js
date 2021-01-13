const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

const books = [];

// /admin/add-product => GET
router.get('/add-book', (req, res, next) => {
  res.render('add-book', {
    pageTitle: 'Add Book'
  });
});

router.get('/view-books', (req, res, next) => {
  res.render('view-books', {
    pageTitle: 'View Books',
    books: books
  });
});



// /admin/add-product => POST
router.post('/add-book', (req, res, next) => {
  books.push({ 
    title: req.body.title,
    pages: req.body.pages,
    summary: req.body.summary,
    genre: req.body.genre
  });
  console.log(books);
  res.render('view-books', {
    pageTitle: 'View Books',
    books: books
  });
});

exports.routes = router;
exports.books = books;
