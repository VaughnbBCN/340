var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 7432;

// Setting up Handlebars with custom helper 'eq'
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({
  extname: ".hbs",
  helpers: {
    eq: (v1, v2) => v1 === v2
  }
}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector');

// Route modules
var indexRoutes = require('./routes/index');
var customerRoutes = require('./routes/customers');
var productRoutes = require('./routes/products');
var serviceRoutes = require('./routes/services');
var appointmentRoutes = require('./routes/appointments');
var orderRoutes = require('./routes/orders');
var skintypeRoutes = require('./routes/skintypes');

// Use the routes
app.use('/', indexRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/orders', orderRoutes);
app.use('/skintypes', skintypeRoutes);

// Start the server
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

