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

    app.use((req, res, next) => {
        // * = any, can be set to specific domains
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    
    ////////////////////////////////////////////////////////////////////////////////////
    
// const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))    
// const io = require('socket.io')(server);
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

// app.listen(PORT);

const names = ["Ted", "Barney", "Robin", "Lily", "Marshall"];

const server = app.listen(PORT);
const io = require('./socket').init(server);
io.on('connection', socket => {
  console.log('Client connected');
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  })

  socket.on('add', name => {
    if (!names.find(n => n == name)) {
        names.push(name);
        io.emit('add', names);
    }
})

// Listen for remove events
socket.on('remove', name => {

    for (let i = 0; i < names.length; i++){
        if (names[i] === name){
            names.splice(i, 1);
        }
    }

    console.log(names);
    io.emit('remove', names);
})

});