var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display and search for customers
router.get('/', function(req, res) {
    let baseQuery = "SELECT * FROM Customers";
    let query = baseQuery;
    const searchQuery = req.query.search;

    if (searchQuery) {
        query += " WHERE firstName LIKE '%" + searchQuery + "%' OR lastName LIKE '%" + searchQuery + "%' OR email LIKE '%" + searchQuery + "%'";
    }

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        // If there's a searchQuery but no results, you might want to run the baseQuery to show all customers
        if (searchQuery && results.length === 0) {
            db.pool.query(baseQuery, function(error, allResults) {
                res.render('customers', { customers: allResults, searchQuery: '' });
            });
        } else {
            res.render('customers', { customers: results, searchQuery: searchQuery });
        }
    });
});


// Route to add a new customer
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Customers (email, firstName, lastName, skinTypeID, phoneNumber) VALUES (?, ?, ?, ?, ?)`;
    
    db.pool.query(query, [data.email, data.firstName, data.lastName, data.skinTypeID, data.phoneNumber], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add customer.");
            return;
        }
        res.redirect('/customers');
    });
});

// Route to update a customer
router.post('/update/:id', function(req, res) {
    const customerId = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE Customers SET email = ?, firstName = ?, lastName = ?, skinTypeID = ?, phoneNumber = ? WHERE customerID = ?';

    db.pool.query(updateQuery, [data.email, data.firstName, data.lastName, data.skinTypeID, data.phoneNumber, customerId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating customer.');
            return;
        }
        res.redirect('/customers');
    });
});

// Route to delete a customer
router.post('/delete', function(req, res) {
    const customerId = req.body.customerID;
    const deleteCustomerQuery = `DELETE FROM Customers WHERE customerID = ?`;

    db.pool.query(deleteCustomerQuery, [customerId], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting customer.');
        }
        res.redirect('/customers');
    });
});

// Route to delete a customer
router.post('/delete/:id', function(req, res) {
    const customerId = req.params.id;
    let deleteQuery = 'DELETE FROM Customers WHERE customerID = ?';

    db.pool.query(deleteQuery, [customerId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Error deleting customer.');
            return;
        }
        res.redirect('/customers');
    });
});

module.exports = router;
