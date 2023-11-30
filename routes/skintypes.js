var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all SkinTypes with search functionality
router.get('/', function(req, res) {
    let query = "SELECT * FROM SkinTypes";
    const searchQuery = req.query.search;

    if (searchQuery) {
        query += " WHERE skinTypeID LIKE '%" + searchQuery + "%' ";
    }

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('SkinTypes', { 
            SkinTypes: results,
            searchQuery: searchQuery  // Include the search query in the rendered variables
        });
    });
});

// Route to add a new skinType
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO SkinTypes (skinTypeDescription) VALUES ( ?)`;
    db.pool.query(query, [ data.description], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add skinType.");
            return;
        }
        res.redirect('/SkinTypes');
    });
});

// Route to update a skinType
router.post('/update/:id', function(req, res) {
    const skinTypeId = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE SkinTypes SET skinTypeDescription = ? WHERE skinTypeID = ?';

    db.pool.query(updateQuery, [data.skinTypeDescription, skinTypeId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating skinType.');
            return;
        }
        res.redirect('/SkinTypes');
    });
});

// Route to delete a skinType
router.post('/delete', function(req, res) {
    const skinTypeId = req.body.skinTypeID;
    const deleteskinTypeQuery = `DELETE FROM SkinTypes WHERE skinTypeID = ?`;

    db.pool.query(deleteskinTypeQuery, [skinTypeId], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting skinType.');
        }
        res.redirect('/SkinTypes');
    });
});

module.exports = router;