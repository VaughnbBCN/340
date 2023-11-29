var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res) {
    let query = `
        SELECT Appointments.*, Customers.firstName, Customers.lastName
        FROM Appointments
        JOIN Customers ON Appointments.customerID = Customers.customerID;
    `;

    db.pool.query(query, function(error, results, fields) {
        if (error) {
            console.error("Error fetching appointments: ", error);
            res.sendStatus(500); // Internal Server Error
            return;
        }

        // Optional: Format the data if needed (like date formatting)
        const formattedResults = results.map(appointment => {
            // Example: Formatting appointment date
            // You can add any additional formatting logic here
            appointment.formattedDate = formatDate(appointment.appointmentDate);
            return appointment;
        });

        // Render the appointments page and pass the retrieved data
        res.render('appointments', {
            appointments: formattedResults
        });
    });
});

// Route to add a new appointment
router.post('/add', function(req, res) {
    let data = req.body;
    // Assuming your Appointments table has a 'status' column you want to set to 'Scheduled' by default
    let query = `INSERT INTO Appointments (customerID, appointmentDate, totalPrice, status) VALUES (?, ?, ?, 'Scheduled')`;
    
    db.pool.query(query, [data.customerID, data.appointmentDate, data.totalPrice], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send("Failed to add appointment.");
            return;
        }
        res.redirect('/appointments');
    });
});

// Route to update an appointment
router.post('/update/:id', function(req, res) {
    const appointmentId = req.params.id;
    const data = req.body;
    let updateQuery = 'UPDATE Appointments SET customerID = ?, appointmentDate = ?, totalPrice = ?, status = ? WHERE appointmentID = ?';

    db.pool.query(updateQuery, [data.customerID, data.appointmentDate, data.totalPrice, data.status, appointmentId], function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Server error while updating appointment.');
            return;
        }
        res.redirect('/appointments');
    });
});

// Route to delete an appointment
router.post('/delete', function(req, res) {
    const appointmentId = req.body.appointmentID;
    const deleteAppointmentQuery = `DELETE FROM Appointments WHERE appointmentID = ?`;

    db.pool.query(deleteAppointmentQuery, [appointmentId], function(error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting appointment.');
        }
        res.redirect('/appointments');
    });
});

module.exports = router;
