var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all orders with search functionality
router.get('/', function(req, res) {
    let query = "SELECT * FROM Orders";
    const searchQuery = req.query.search;

    if (searchQuery) {
        query += " WHERE orderID LIKE '%" + searchQuery + "%' ";
    }

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('orders', { 
            orders: results,
            searchQuery: searchQuery  // Include the search query in the rendered variables
        });
    });
});

// Route to add a new order
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Orders (customerID, orderDate, totalAmount) VALUES (?, ?, ?)`;
    db.pool.query(query, [data.customerID, data.orderDate, data.totalAmount], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add order.");
            return;
        }
        res.redirect('/orders');
    });
});

// Route to update an order
router.post('/update/:id', function(req, res) {
    const orderID = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE orders SET customerID = ?, orderDate = ?, totalAmount = ? WHERE orderID = ?';

    db.pool.query(updateQuery, [data.customerID, data.orderDate, data.totalAmount, orderID], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating order.');
            return;
        }
        res.redirect('/orders');
    });
});

// Route to delete an order
router.post('/delete', function(req, res) {
    const orderID = req.body.orderID;
    const deleteOrderQuery = `DELETE FROM Orders WHERE orderID = ?`;

    
    db.pool.query(deleteOrderQuery, [orderID], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting order.');
        }
        res.redirect('/orders');
    }); // This is where the closing brace and parenthesis were missing
});

module.exports = router;