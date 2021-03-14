const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const fs = require('fs');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')

const products = require('../public/stuff');
const ITEMS_PER_PAGE = 10;
const dummyData = require('../public/dummy.json');

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

///////////////////////////////////////////////////////////////

router.get('/fetchAll', (req, res, next) => {
  // res.json(dummyData);
  res.render('dummyData', {
    dummyData: dummyData
  });
});

router.post('/insert', (req, res, next) => {
  // let newAvenger = req.body.newData;

  let newAvenger = {
    name: "Spider-Man"
  }

  // newAvenger = JSON.stringify(newAvenger);
  
  for (let data of dummyData.avengers){
    // console.log(data.name);

    if (data.name.toString() === newAvenger.name.toString()){
      return res.status(500).json({
        message: "Name already found, please try again"
      })
    } 
  }

    dummyData.avengers.push(newAvenger);
    return res.status(200).json({
      dummyData: dummyData
    })
});




//     if (dummyData.avengers.find(el => el.name === newAvenger.name) === undefined){
//       dummyData.avengers.push({name: newAvenger.name});
// console.log(dummyData);
//       res.status(200).json({dummyData: dummyData})
//     } else {
//       res.status(500).json({message: "failed"});
//     }

  // }
// });