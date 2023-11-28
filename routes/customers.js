var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// GET route for listing customers
router.get('/', function(req, res) {
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        res.render('customers', {data: rows}); // Assuming 'customers.hbs' is your customer listing template
    });
});

// POST route for adding a new customer
router.post('/add', function(req, res) {
    let data = req.body;
    let skinTypeID = parseInt(data.skinTypeID);
    if (isNaN(skinTypeID)) {
        skinTypeID = 'NULL';
    }

    let phoneNumber = parseInt(data.phoneNumber);
    if (isNaN(phoneNumber)) {
        phoneNumber = 'NULL';
    }

    let query1 = `INSERT INTO Customers(email, firstName, lastName, skinTypeID, phoneNumber) VALUES ('${data.email}', '${data.firstName}', '${data.lastName}', ${skinTypeID}, ${phoneNumber})`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/customers');
        }
    });
});

// DELETE route for deleting a customer
router.delete('/delete', function(req, res) {
    let data = req.body;
    let customerID = parseInt(data.customerid);
    let deleteCustomerQuery = `DELETE FROM Customers WHERE customerID = ?`;
    
    db.pool.query(deleteCustomerQuery, [customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;
