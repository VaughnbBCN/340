var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Home route
router.get('/', function(req, res) {
    let query1 = "SELECT * FROM Customers;";

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        res.render('index', {data: rows});
    });
});

module.exports = router;
