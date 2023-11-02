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
SELECT * FROM OrderDetails;

/*Create operation for OrderDetails entity*/
INSERT INTO OrderDetails(orderID, productID, quantity, orderSubtotal)
VALUES( :orderIDInput, :productIDInput, :quantityInput, :orderSubtotalInput);

/*Delete operation for OrderDetails entity*/
DELETE FROM OrderDetails WHERE id = :orderDetailsID_DropDown_selected_to_delete;

/*Update operation for OrderDetails entity*/
UPDATE OrderDetails
SET quantity = :quantityInput, orderSubtotal :orderSubtotalInput, 
WHERE id= :orderDetailsID_DropDown_selected_to_update;



/*Read operation for Appointments entity*/
SELECT * FROM Appointments;

/*Create operation for Appointments entity*/
INSERT INTO Appointments(customerID, appointmentDate, totalPrice, status)
VALUES( :customerIDInput, :appointmentDateInput, :totalPriceInput, :statusInput);

/*Delete operation for Appointments entity*/
DELETE FROM Appointments WHERE id = :appointmentID_DropDown_selected_to_delete;

/*Update operation for Appointments entity*/
UPDATE Appointments
SET status = :statusInput
WHERE id= :appointmentID_DropDown_selected_to_update;



/*Read operation for AppointmentServices entity*/
SELECT * FROM AppointmentServices;

/*Create operation for AppointmentServices entity*/
INSERT INTO AppointmentServices(appointmentID, serviceID)
VALUES( :appointmentIDInput, :serviceIDInput);

/*Delete operation for AppointmentServices entity*/
DELETE FROM AppointmentServices WHERE id = :appointmentServicesID_DropDown_selected_to_delete;

/*Update operation for AppointmentServices entity*/
UPDATE AppointmentServices
SET serviceID =: serviceIDInput
WHERE id= :appointmentServicesID_DropDown_selected_to_update;


-- dis-associate a service from an appointment where a customer has changed their mind about what services they wish to receive
DELETE FROM AppointmentServices WHERE appointmentID
= :appointment_ID_selected_from_customer_and_appointment AND serviceID
= :Service_ID_selected_from_service_list


/*Read operation for SkinTypes entity*/
SELECT * FROM SkinTypes;

/*Create operation for SkinTypes entity*/
INSERT INTO SkinTypes(skinTypeDescription)
VALUES( :skinTypeDescriptionInput);

/*Delete operation for SkinTypes entity*/
DELETE FROM SkinTypes WHERE id = :skinTypeID_DropDown_selected_to_delete;

/*Update operation for SkinTypes entity*/
UPDATE SkinTypes
SET skinTypeDescription = :skinTypeDescriptionInput, 
WHERE id= : skinTypeID_DropDown_selected_to_update;






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

-- associate a character with a certificate (M-to-M relationship addition)
INSERT INTO bsg_cert_people (pid, cid) VALUES
(:character_id_from_dropdown_Input, :certification_id_from_dropdown_Input)
