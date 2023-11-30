var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all SkinTypes
router.get('/', function(req, res) {
    let query = "SELECT * FROM SkinTypes";
    db.pool.query(query, function(error, results) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('skintypes', { skinTypes: results });
    });
});

// Route to add a new SkinType
router.post('/add', function(req, res) {
    let data = req.body;
    let query = "INSERT INTO SkinTypes (description) VALUES (?)";
    db.pool.query(query, [data.description], function(error) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/skintypes');
    });
});

// Route to render the update form for a SkinType
router.get('/edit/:id', function(req, res) {
    const skinTypeID = req.params.id;
    let query = "SELECT * FROM SkinTypes WHERE skinTypeID = ?";
    db.pool.query(query, [skinTypeID], function(error, results) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('edit-skin-type', { skinType: results[0] });
    });
});

// Route to update a SkinType
router.post('/update/:id', function(req, res) {
    const skinTypeID = req.params.id;
    const data = req.body;
    let query = "UPDATE SkinTypes SET description = ? WHERE skinTypeID = ?";
    db.pool.query(query, [data.description, skinTypeID], function(error) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/skintypes');
    });
});

// Route to delete a SkinType
router.post('/delete/:id', function(req, res) {
    const skinTypeID = req.params.id;
    let query = "DELETE FROM SkinTypes WHERE skinTypeID = ?";
    db.pool.query(query, [skinTypeID], function(error) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/skintypes');
    });
});

module.exports = router;
