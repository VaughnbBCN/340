var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all services with search functionality
router.get('/', function(req, res) {
    let query = "SELECT * FROM Services";
    const searchQuery = req.query.search;

    if (searchQuery) {
        query += " WHERE serviceName LIKE '%" + searchQuery + "%' OR description LIKE '%" + searchQuery + "%'";
    }

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        res.render('services', { 
            services: results,
            searchQuery: searchQuery  // Include the search query in the rendered variables
        });
    });
});

// Route to add a new service
router.post('/add', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Services (serviceName, servicePrice, duration, description) VALUES (?, ?, ?, ?)`;
    db.pool.query(query, [data.serviceName, data.servicePrice, data.duration, data.description], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add service.");
            return;
        }
        res.redirect('/services');
    });
});

// Route to update a service
router.post('/update/:id', function(req, res) {
    const serviceId = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE Services SET serviceName = ?, servicePrice = ?, duration = ?, description = ? WHERE serviceID = ?';

    db.pool.query(updateQuery, [data.serviceName, data.servicePrice, data.duration, data.description, serviceId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating service.');
            return;
        }
        res.redirect('/services');
    });
});

// Route to delete a service
router.post('/delete', function(req, res) {
    const serviceId = req.body.serviceID;
    const deleteServiceQuery = `DELETE FROM Services WHERE serviceID = ?`;

    db.pool.query(deleteServiceQuery, [serviceId], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting service.');
        }
        res.redirect('/services');
    });
});

module.exports = router;
