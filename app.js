var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const PORT = 7448;

// Setting up Handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })  
    });                                   

    app.post('/add-customer', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let skinTypeID = parseInt(data.skinTypeID);
    if (isNaN(skinTypeID))
    {
        skinTypeID = 'NULL'
    }

    let phoneNumber = parseInt(data.phoneNumber);
    if (isNaN(phoneNumber))
    {
        phoneNumber = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers(email, firstName, lastName, skinTypeID, phoneNumber) VALUES ('${data.email}', '${data.firstName}', ${data.lastName}, ${skinTypeID}, ${phoneNumber}))`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer/', function(req,res,next){
    let data = req.body;
    let personID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customers WHERE customerid = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteCustomer, [personID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
             {
                          res.sendStatus(204);
                      }
                  })
              }
  );







/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
