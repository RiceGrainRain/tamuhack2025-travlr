DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Food;
DROP TABLE IF EXISTS Flight_Orders;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Customers (
    Customer_ID INTEGER NOT NULL,
    First_Name VARCHAR(10) NOT NULL,
    Last_Name VARCHAR(15) NOT NULL,
    Password_ TEXT,
    Email_Address TEXT UNIQUE,
    Flight_ID INTEGER REFERENCES Flights(Flight_ID),
    Seat VARCHAR(3),
    Checked_In BOOLEAN,
    Passed_Security BOOLEAN,
    On_Flight BOOLEAN,
    Credits NUMERIC(10,2),
    PRIMARY KEY (Customer_ID)
);

CREATE TABLE Employees (
    Employee_ID INTEGER NOT NULL PRIMARY KEY,
    First_Name VARCHAR(10) NOT NULL,
    Last_Name VARCHAR(15) NOT NULL,
    Password_ TEXT,
    Email_Address TEXT UNIQUE,
    Flight_Number INTEGER REFERENCES Flights(Flight_ID),
    PRIMARY KEY (Employee_ID)
);

CREATE TABLE Food (
    Food_ID INTEGER NOT NULL PRIMARY KEY,
    Food_Name TEXT NOT NULL,
    Price NUMERIC(3,2) NOT NULL
);

CREATE TABLE Flight_Orders (
    Customer_ID INTEGER NOT NULL REFERENCES Customers (Customer_ID),
    Food_ID INTEGER NOT NULL REFERENCES Food(Food_Name),
    Seat VARCHAR(3) NOT NULL,
    Completed BOOLEAN,
    PRIMARY KEY (Customer_ID)
);

CREATE TABLE Reviews (
    Flight_ID VARCHAR(8) NOT NULL,
    Customer_ID INTEGER NOT NULL,
    Rating INTEGER NOT NULL,
    Review TEXT NOT NULL,
    PRIMARY KEY (Flight_ID, Customer_ID)
);

CREATE TABLE Flights (
    Flight_ID VARCHAR(8) NOT NULL,
    Depart VARCHAR(3) NOT NULL,
    Dest VARCHAR(3) NOT NULL,
    Depart_Time INTEGER NOT NULL,
    Dest_Time INTEGER NOT NULL,
    Depart_Gate VARCHAR(3) NOT NULL,
    Dest_Gate VARCHAR(3) NOT NULL
);

ALTER TABLE Flights
ADD CONSTRAINT pk PRIMARY KEY (Flight_ID);
 

INSERT INTO Flights ( Flight_ID, Depart, Dest)
VALUES ('TX784J', "DFW", "MGM", 1200, 1400, "A53", "C29"), ('AG923K', 'LAX', 'DEN', 1600, 1900, "B32", "C30"), ('RM150P', 'JAX', 'ATL', 1000, 1100, "B30", "D03");

INSERT INTO Food
VALUES (1, "Chicken Breasts", 4.99), (2, "Cheesecake", 2.99), (1, "Yogurt Parfate", 1.99);

INSERT INTO Reviews (Flight_ID, Customer_ID, Rating, Review)
VALUES ('RM150P', 2, 4, 'Everything was great but a little bumpy at the end'), ('AG923K', 2, 2, 'Food was cold and the flight attendants are rude'),  
('RM150P', 1, 3, 'It was alright, but I got the middle seat'), ('TX784J', 1, 5, 'Amazing flight with Amazing food and absolutely splendid service'),
('TX784J', 3, 1, 'Terrible Flight I did not even get my food at the end and will never fly again'),('AG923K', 2, 3, 'I needed more leg room');

INSERT INTO Flight_Orders (Customer_ID,
    First_Name,
    Last_Name,
    Password_,
    Email_Address,
    Flight_ID,
    Seat,
    Checked_In,
    Passed_Security,
    On_Flight,
    Credits)
VALUES (1, 'John', 'Doe', 'pass123', 'john.doe@example.com', 'RM150P', '12A', TRUE, TRUE, FALSE, 120.50),
(2, 'Alice', 'Smith', 'alice@2025', 'alice.smith@example.com', 'AG923K', '7C', FALSE, FALSE, FALSE, 75.00),
(3, 'Mark', 'Lee', 'mlee#890', 'mark.lee@example.com', 'TX784J', '21B', TRUE, TRUE, TRUE, 250.00);

INSERT INTO Employees (Employee_ID, First_Name, Last_Name, Password_, Email_Address, Flight_Number) 
VALUES (101, 'Sarah', 'Johnson', 'sarah@flight99', 'sarah.johnson@example.com', 784),
(102, 'David', 'Brown', 'dbrown123', 'david.brown@example.com', 923),
(103, 'Emily', 'Taylor', 'emily*secure', 'emily.taylor@example.com', 508);


INSERT INTO Flight_Orders (Customer_ID, Food_ID, Seat, Completed)
VALUES 
(1, 1, '12A', TRUE),
(2, 2, '7C', FALSE),
(3, 1, '21B', TRUE),
(1, 2, '12A', TRUE),
(2, 3, '7C', FALSE),
(3, 3, '21B', TRUE);
