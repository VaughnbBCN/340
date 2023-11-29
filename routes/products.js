var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all products and handle search
router.get('/', function(req, res) {
    let query = "SELECT * FROM Products";
    const searchQuery = req.query.query;

    if (searchQuery) {
        query += " WHERE productName LIKE '%" + searchQuery + "%'";
        // Add more conditions if you want to search in other fields
    }

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('products', { products: results });
    });
});

// Route to add a new product
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Products (productName, productPrice, description, stockQuantity, skinTypeID) VALUES (?, ?, ?, ?, ?)`;
    db.pool.query(query, [data.productName, data.productPrice, data.description, data.stockQuantity, data.skinTypeID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add product.");
            return;
        }
        res.redirect('/products');
    });
});

// Route to update a product
router.post('/update/:id', function(req, res) {
    const productId = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE Products SET productName = ?, productPrice = ?, description = ?, stockQuantity = ?, skinTypeID = ? WHERE productID = ?';

    db.pool.query(updateQuery, [data.productName, data.productPrice, data.description, data.stockQuantity, data.skinTypeID, productId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating product.');
            return;
        }
        res.redirect('/products');
    });
});

// Route to delete a product
router.post('/delete', function(req, res) {
    const productId = req.body.productID;
    const deleteProductQuery = `DELETE FROM Products WHERE productID = ?`;

    db.pool.query(deleteProductQuery, [productId], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting product.');
        }
        res.redirect('/products');
    });
});

module.exports = router;
