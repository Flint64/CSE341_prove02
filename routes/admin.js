const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const fs = require('fs');
const fetch = require('node-fetch');

const products = require('../public/stuff');
const ITEMS_PER_PAGE = 10;

const router = express.Router();

const books = [];

// /admin/add-product => GET
router.get('/add-book', (req, res, next) => {
  res.render('add-book', {
    pageTitle: 'Add Book'
  });
});


router.get('/viewData', (req, res, next) => {

  const start = +req.query.start || 0;
  const end = +req.query.end || 10;
  const totalItems = (products.length - 1);
  let newData = [];

  newData = products.slice(start, end);
  
        res.render('viewData', {
          prods: newData,
          pageTitle: 'Data',
          path: '/viewData',
          totalItems: totalItems
        });
});

///////////////////////////////////////////////////////////////

router.get('/pokeAPI', (req, res, next) => {

    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      res.render('pokeAPI', {
        pokedex: json
      });
    });
});

// router.post('/pokeAPI/next', (req, res, next) => {
//   console.log(req.body.next);
// });

///////////////////////////////////////////////////////////////

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
