/*Read operation for Customers entity*/
SELECT * FROM Customers;

/*Create operation for Customers entity*/
INSERT INTO Customers(email, firstName, lastName, skinTypeID)
VALUES( :customerEmailInput, :customerFirstNameInput, :customerLastNameInput, :customerSkinTypeIDInput);

/*Delete operation for Customers entity*/
DELETE FROM Customers WHERE id = :customer_ID_DropDown_selected_to_delete;

/*Update operation for Customers entity*/
UPDATE Customers
SET email = :customerEmailInput, lastName= :customerLastNameInputrentalPriceInput, 
WHERE id= :game_ID_DropDown_selected_to_update;


/*Read operation for Products entity*/
SELECT * FROM Products;

/*Create operation for Products entity*/
INSERT INTO Products(
productName,
productPrice,
 productDescription,
 stockQuantity,
SkinTypeID
)
VALUES
(
    :productNameInput,
    :productPriceInput,
    :productDescriptionInput, 
    :stockQuantityInput, 
    :SkinTypeIDInput
);

/*Delete operation for Products entity*/
DELETE FROM Products WHERE id = :productID_DropDown_selected_to_delete;

/*Update operation for Product entity*/
UPDATE Products
SET productPrice = :productPriceInput, stockQuantity= :stockQuantityInput, 
WHERE id= :products_ID_DropDown_selected_to_update;



/*Create operation for Services entity*/
INSERT INTO Services( serviceName, servicePrice, duration, serviceDescription)
VALUES( :serviceNameInput, :servicePriceInput,  :durationInput, :serviceDescriptionInput);

/*Update operation for Services entity*/
UPDATE Services
SET servicePrice = :servicePriceInput, duration= :durationInput
WHERE id= :serviceID_selected_to_update;

/*Delete operation for Services entity*/
DELETE FROM Services WHERE id = :serviceID_selected_to_delete;

/*Read operation for Services entity*/ 


/*Create operation for Orders entity*/
INSERT INTO Orders( customerID, orderDate, totalAmount)
VALUES( :customerIDInput, :orderDateInput, :totalAmountInput);

/*Update operation for Orders entity*/
UPDATE Orders 
SET totalAmount = :totalAmountInput
WHERE orderid= :orderID_selected_to_update;

/*Delete operation for Orders entity*/
DELETE FROM Orders WHERE orderid = :orderID_DropDown_selected_to_delete;


/*Read operation for OrderDetails entity*/
SELECT * FROM Customers;

/*Create operation for Customers entity*/
INSERT INTO Customers(email, firstName, lastName, skinTypeID)
VALUES( :customerEmailInput, :customerFirstNameInput, :customerLastNameInput, :customerSkinTypeIDInput);

/*Delete operation for Customers entity*/
DELETE FROM Customers WHERE id = :customer_ID_DropDown_selected_to_delete;

/*Update operation for Customers entity*/
UPDATE Customers
SET email = :customerEmailInput, lastName= :customerLastNameInputrentalPriceInput, 
WHERE id= :game_ID_DropDown_selected_to_update;



/*Read operation for Appointments entity*/
SELECT * FROM Customers;

/*Create operation for Customers entity*/
INSERT INTO Customers(email, firstName, lastName, skinTypeID)
VALUES( :customerEmailInput, :customerFirstNameInput, :customerLastNameInput, :customerSkinTypeIDInput);

/*Delete operation for Customers entity*/
DELETE FROM Customers WHERE id = :customer_ID_DropDown_selected_to_delete;

/*Update operation for Customers entity*/
UPDATE Customers
SET email = :customerEmailInput, lastName= :customerLastNameInputrentalPriceInput, 
WHERE id= :game_ID_DropDown_selected_to_update;


/*Read operation for AppointmentServices entity*/
SELECT * FROM Customers;

/*Create operation for Customers entity*/
INSERT INTO Customers(email, firstName, lastName, skinTypeID)
VALUES( :customerEmailInput, :customerFirstNameInput, :customerLastNameInput, :customerSkinTypeIDInput);

/*Delete operation for Customers entity*/
DELETE FROM Customers WHERE id = :customer_ID_DropDown_selected_to_delete;

/*Update operation for Customers entity*/
UPDATE Customers
SET email = :customerEmailInput, lastName= :customerLastNameInputrentalPriceInput, 
WHERE id= :game_ID_DropDown_selected_to_update;


-- dis-associate a service from an appointment where a customer has changed their mind about what services they wish to receive
DELETE FROM AppointmentServices WHERE appointmentID
= :appointment_ID_selected_from_customer_and_appointment AND serviceID
= :Service_ID_selected_from_service_list


/*Read operation for SkinTypes entity*/
SELECT * FROM Customers;

/*Create operation for Customers entity*/
INSERT INTO Customers(email, firstName, lastName, skinTypeID)
VALUES( :customerEmailInput, :customerFirstNameInput, :customerLastNameInput, :customerSkinTypeIDInput);

/*Delete operation for Customers entity*/
DELETE FROM Customers WHERE id = :customer_ID_DropDown_selected_to_delete;

/*Update operation for Customers entity*/
UPDATE Customers
SET email = :customerEmailInput, lastName= :customerLastNameInputrentalPriceInput, 
WHERE id= :game_ID_DropDown_selected_to_update;






-- get all Planet IDs and Names to populate the Homeworld dropdown
SELECT planet_id, name FROM bsg_planets

-- get all characters and their homeworld name for the List People page
SELECT bsg_people.character_id, fname, lname, bsg_planets.name AS homeworld, age
FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id

-- get a single character's data for the Update People form
SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE
character_id = :character_ID_selected_from_browse_character_page

-- get all character's data to populate a dropdown for associating with a
certificate
SELECT character_id AS pid, fname, lname FROm bsg_people

-- get all certificates to populate a dropdown for associating with people
SELECT certification_id AS cid, title FROM bsg_cert

-- get all peoople with their current associated certificates to list
SELECT pid, cid, CONCAT(fname,' ',lname) AS name, title AS certificate
FROM bsg_people
INNER JOIN bsg_cert_people ON bsg_people.character_id = bsg_cert_people.pid
INNER JOIN bsg_cert on bsg_cert.certification_id = bsg_cert_people.cid
ORDER BY name, certificate

-- add a new character
INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES
(:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput)

-- associate a character with a certificate (M-to-M relationship addition)
INSERT INTO bsg_cert_people (pid, cid) VALUES
(:character_id_from_dropdown_Input, :certification_id_from_dropdown_Input)

-- update a character's data based on submission of the Update Character form
UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld
= :homeworld_id_from_dropdown_Input, age= :ageInput WHERE
id= :character_ID_from_the_update_form
