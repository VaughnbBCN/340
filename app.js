var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const PORT = 7448;

// Setting up Handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector');

// Route modules
var indexRoutes = require('./routes/index');    // Assumed you have this for your homepage
var customerRoutes = require('./routes/customers');
var productRoutes = require('./routes/products');

// Use the routes
app.use('/', indexRoutes);          // For your homepage
app.use('/customers', customerRoutes); // Customer-related routes
app.use('/products', productRoutes);

// Start the server
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
