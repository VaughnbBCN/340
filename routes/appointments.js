var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

// Route to display all appointments with customer details
router.get('/', function(req, res) {
    let query = `
        SELECT Appointments.appointmentID, Appointments.appointmentDate, 
               Appointments.totalPrice, Appointments.status, 
               Customers.firstName, Customers.lastName, Customers.customerID
        FROM Appointments
        JOIN Customers ON Appointments.customerID = Customers.customerID
    `; // Removed the semicolon here

    const searchQuery = req.query.search;
    if (searchQuery) {
        query += ` WHERE Customers.firstName LIKE '%${searchQuery}%' 
                   OR Customers.lastName LIKE '%${searchQuery}%'`;
    }

    db.pool.query(query, function(error, results) {
        if (error) {
            console.error("Error fetching appointments: ", error);
            res.sendStatus(500);
            return;
        }
        res.render('appointments', { appointments: results });
    });
});

// Route for displaying the form to add a new appointment
router.get('/add', function(req, res) {
    db.pool.query('SELECT customerID, firstName, lastName FROM Customers', function(error, customers) {
        if (error) {
            console.error("Error fetching customers: ", error);
            res.sendStatus(500);
            return;
        }
        res.render('appointments', { customers: customers });
    });
});

// Route to handle the creation of a new appointment
router.post('/add', function(req, res) {
    const { customerID, appointmentDate, totalPrice, status } = req.body;
    let insertQuery = `
        INSERT INTO Appointments (customerID, appointmentDate, totalPrice, status) 
        VALUES (?, ?, ?, ?)
    `;

    db.pool.query(insertQuery, [customerID, appointmentDate, totalPrice, status], function(error) {
        if (error) {
            console.error("Error adding new appointment: ", error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/appointments');
    });
});

// Route to handle the updating of an appointment
router.post('/update/:id', function(req, res) {
    const { customerID, appointmentDate, totalPrice, status } = req.body;
    const appointmentId = req.params.id;
    let updateQuery = `
        UPDATE Appointments 
        SET customerID = ?, appointmentDate = ?, totalPrice = ?, status = ? 
        WHERE appointmentID = ?
    `;

    db.pool.query(updateQuery, [customerID, appointmentDate, totalPrice, status, appointmentId], function(error) {
        if (error) {
            console.error("Error updating appointment: ", error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/appointments');
    });
});

// Route to handle the deletion of an appointment
router.post('/delete/:id', function(req, res) {
    const appointmentId = req.params.id;
    let deleteQuery = 'DELETE FROM Appointments WHERE appointmentID = ?';

    db.pool.query(deleteQuery, [appointmentId], function(error) {
        if (error) {
            console.error("Error deleting appointment: ", error);
            res.sendStatus(500);
            return;
        }
        res.redirect('/appointments');
    });
});

module.exports = router;
