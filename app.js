const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const mongoose = require('mongoose'); 

// const shopRoutes = require('./routes/shop');

// const MONGODB_URI = 'mongodb+srv://hego64:s10ek0ZplgK0UByb@cluster0.cgnnu.mongodb.net/stuff';
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json()); //application/json
// app.use(bodyParser.urlencoded({
    //     extended: true
    //   }))
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    ////////////////////////////////////////////////////////////////////////////////////
    
const adminData = require('./routes/admin');

app.use('/admin', adminData.routes);
// app.use(shopRoutes);

app.get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('index', {pageTitle: 'Main Page', path: '/'});
   })

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(PORT);

// mongoose.connect(MONGODB_URI)
// .then(result => {
//   app.listen(PORT);
// })
// .catch(err => {
//   console.log(err);
// });