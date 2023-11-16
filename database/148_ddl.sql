-- Disable foreign key checks to allow creating tables in any order
SET FOREIGN_KEY_CHECKS = 0;

-- Creating the SkinTypes table
CREATE OR REPLACE TABLE SkinTypes (
    skinTypeID INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

-- Creating the Customers table
CREATE OR REPLACE TABLE Customers (
    customerID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    skinTypeID INT,
    phoneNumber VARCHAR(15),
    FOREIGN KEY (skinTypeID) REFERENCES SkinTypes(skinTypeID)
);

-- Creating the Products table
CREATE OR REPLACE TABLE Products (
    productID INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL,
    description TEXT,
    stockQuantity INT NOT NULL,
    skinTypeID INT,
    FOREIGN KEY (skinTypeID) REFERENCES SkinTypes(skinTypeID)
);

-- Creating the Services table
CREATE TABLE Services (
    serviceID INT PRIMARY KEY AUTO_INCREMENT,
    serviceName VARCHAR(255) NOT NULL,
    servicePrice DECIMAL(10, 2) NOT NULL,
    duration TIME NOT NULL,
    description TEXT
);

-- Creating the Orders table
CREATE OR REPLACE TABLE Orders (
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    customerID INT NOT NULL,
    orderDate DATE NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

-- Creating the OrderDetails table with CASCADE deletion for orders but not for products
CREATE OR REPLACE TABLE OrderDetails (
    orderDetailsID INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID)
);

-- Altered Appointments table to allow NULL customerID indicating optional relationship
CREATE OR REPLACE TABLE Appointments (
    appointmentID INT PRIMARY KEY AUTO_INCREMENT,
    customerID INT,  -- Removed the NOT NULL constraint to make this NULLable
    appointmentDate DATETIME NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE SET NULL
);


-- Creating the AppointmentServices table
CREATE OR REPLACE TABLE AppointmentServices (
    appointmentServicesID INT PRIMARY KEY AUTO_INCREMENT,
    appointmentID INT NOT NULL,
    serviceID INT NOT NULL,
    FOREIGN KEY (appointmentID) REFERENCES Appointments(appointmentID),
    FOREIGN KEY (serviceID) REFERENCES Services(serviceID)
);

-- Re-enabling foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Statements 

-- Insert into skintypes. skinTypeID definitions: Oily = 1, Dry = 2, Combo = 3
INSERT INTO SkinTypes (description) 
VALUES ('Oily'), ('Dry'), ('Combination');


-- Insert into Customers
INSERT INTO Customers (email, firstName, lastName, skinTypeID, phoneNumber) 
VALUES 
('patt.cahill@example.com', 'Patt', 'Cahill', 1, '123-456-7890'),
('john.allen@example.com', 'John', 'Allen', 2, '123-456-7891'),
('louise.herrera@example.com', 'Louise', 'Herrera', 3, '123-456-7892'),
('kit.coffee@example.com', 'Kit', 'Coffee', 1, '123-456-7893'),
('bob.jones@example.com', 'Bob', 'Jones', 2, '123-456-7894');

-- Insert into Products
INSERT INTO Products (productName, productPrice, description, stockQuantity, skinTypeID) 
VALUES 
('Facial Cleanser', 15.99, 'Suitable for oily skin.', 100, 1),
('Moisturizer', 20.99, 'Suitable for dry skin.', 100, 2),
('Sunscreen', 25.99, 'Suitable for all skin types.', 100, 3),
('Exfoliator', 18.99, 'Suitable for oily and combination skin.', 100, 1),
('Mask', 22.99, 'Suitable for dry and combination skin.', 100, 3);

-- Insert into Services
INSERT INTO Services (serviceName, servicePrice, duration, description) 
VALUES 
('HydraFacial', 250.00, '01:00:00', ' a facial treatment using a patented device to deliver exfoliation, cleansing, extraction, and hydration to the face.'),
('Massage', 80.00, '01:30:00', 'Full body massage from our experienced professionals.'),
('Chemical Peel', 400.00, '02:00:00', 'A procedure in which a chemical solution is applied to the skin to remove the top layers.'),
('LED Light Therapy Facial', 85.00, '00:20:00', 'LED therapy is a non-invasive beauty treatment that exposes your skin to light energy,');

-- Insert into Orders 
INSERT INTO Orders (customerID, orderDate, totalAmount) 
VALUES 
(1, '2023-10-26', 52.97),  -- Order 1
(2, '2023-10-26', 77.97),  -- Order 2
(3, '2023-10-26', 39.98);  -- Order 3


INSERT INTO OrderDetails (orderID, productID, quantity, subtotal) 
VALUES 
(1, 1, 2, 31.98),  -- 2 items of 'Facial Cleanser' for order 1, 15.99 each
(1, 2, 1, 20.99),  -- 1 item of 'Moisturizer' for order 1, 20.99 each

(2, 3, 3, 77.97),  -- 3 items of 'Sunscreen' for order 2, 25.99 each

(3, 4, 1, 18.99),  -- 1 item of 'Exfoliator' for order 3, 18.99 each
(3, 5, 1, 22.99);  -- 1 item of 'Mask' for order 3, 22.99 each



-- Insert into appointments
INSERT INTO Appointments (customerID, appointmentDate, totalPrice, status) 
VALUES 
(1, '2023-11-01 10:00:00', 330.00, 'Scheduled'),
(2, '2023-11-01 14:00:00', 485.00, 'Scheduled'),
(3, '2023-11-02 10:00:00', 330.00, 'Scheduled');


-- Insert into Appointment Services
INSERT INTO AppointmentServices (appointmentID, serviceID) 
VALUES 
(1, 1), -- Linking the first appointment to the first service
(1, 2), -- Linking the first appointment to the second service
(2, 3), -- Linking the second appointment to the third service
(2, 4), -- Linking the second appointment to the fourth service
(3, 1), -- Linking the third appointment to the first service
(3, 2); -- Linking the third appointment to the second service

