var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all products
router.get('/', function(req, res) {
    let query = "SELECT * FROM Products;";
    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        // Assuming you have a view called 'products' to display this data
        res.render('products', { data: results });
    });
});

// Route to add a new product (corresponds to the form action in your add product form)
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Products (productName, productPrice, description, stockQuantity, skinTypeID) VALUES (?, ?, ?, ?, ?)`;
    db.pool.query(query, [data.productName, data.productPrice, data.description, data.stockQuantity, data.skinTypeID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
        }
        res.redirect('/products');
    });
});

// Route to update a product
router.post('/update', function(req, res) {
    let data = req.body;
    let query = `UPDATE Products SET productName = ?, productPrice = ?, description = ?, stockQuantity = ?, skinTypeID = ? WHERE productID = ?`;
    db.pool.query(query, [data.productName, data.productPrice, data.description, data.stockQuantity, data.skinTypeID, data.productID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
        }
        res.redirect('/products');
    });
});

// Route to delete a product
router.post('/delete', function(req, res) {
    let data = req.body;
    let query = `DELETE FROM Products WHERE productID = ?`;
    db.pool.query(query, [data.productID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
            return;
        }
        res.redirect('/products');
    });
});

module.exports = router;
