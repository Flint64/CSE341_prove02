const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

const port = process.env.PORT || 3000
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////////////////////////////////////


app.use('/admin', adminData.routes);
// app.use(shopRoutes);

app.get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('index', {pageTitle: 'Main Page', path: '/'});
   })

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(port);